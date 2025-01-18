from .serializers import RegistrationSerializer, ResetPasswordSerializer
from user.serializers import UserSerializer
from user.models import VerificationData
from django.http import JsonResponse
from .exceptions import *
from django.http import HttpRequest
from rest_framework.parsers import JSONParser
from user.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from backend.settings import REFRESH_TOKEN_DURATION
from django.contrib.auth import authenticate
from .utils import AuthenticationUtils
from django.contrib.auth.hashers import make_password, check_password
import logging
from django.utils import timezone
from typing import Optional

def generate_tokens_for_user(user: User) -> dict[str, str]:
    refresh_token = RefreshToken.for_user(user)
    return {
        "access_token": str(refresh_token.access_token),
        "refresh_token": str(refresh_token)
    }

def generate_authentication_response(user: User) -> JsonResponse:
    tokens = generate_tokens_for_user(user)

    response = JsonResponse(
        {
            "user": UserSerializer(user).data,
            "access_token": tokens["access_token"]
        }, 
        status=201
    )

    response.set_cookie(
        "user_r", 
        tokens["refresh_token"], 
        httponly=True, 
        secure=True, 
        samesite="Strict",
        expires=REFRESH_TOKEN_DURATION
    )

    return response

def register_user(request: HttpRequest) -> JsonResponse:
    json = JSONParser().parse(request)
    data = RegistrationSerializer(data=json)

    if not data.is_valid():
        raise RegistrationException(data.errors, 400)
    
    user = data.save()

    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data = VerificationData(user=user, field="email", code=make_password(verification_code))
    verification_data.save()

    logging.info(f"Verification code for {user.email}: {verification_code}")

    return generate_authentication_response(user)


def login_user(request: HttpRequest) -> JsonResponse:
    json = JSONParser().parse(request)
    username = json.get("username")
    password = json.get("password")

    user: User = authenticate(username=username, password=password)

    if user is None:
        raise AuthenticationException("Invalid credentials", 400)
    
    response = generate_authentication_response(user)
    response.status_code = 200
    return response

def get_session(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)
    return JsonResponse(UserSerializer(user).data, status=200)

def get_user_by_id(id: int) -> User:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise UserDoesNotExistException(status_code=404)
    
def refresh_token(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")

    if RefreshToken(refresh_token).check_blacklist():
        raise RefreshTokenException("Token blacklisted", 409)

    newToken = RefreshToken(refresh_token)
    return JsonResponse({"access_token": str(newToken.access_token)}, status=200)

def logout_user(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")

    newToken = RefreshToken(refresh_token)
    newToken.blacklist()
    return JsonResponse({"message", "Succesfully logged out"}, status=200)

def check_email_verification(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)

    verification_data = VerificationData.objects.filter(user=user, field="email").first()

    if verification_data is None:
        raise VerificationException("Email is already verified", 409) 
    
    verification_code = request.GET.get("code")

    if verification_code is None:
        raise VerificationException("No verification code provided", 400)

    if check_password(verification_code, verification_data.code):
        user.email_verified_at = timezone.now()
        user.save()

        verification_data.delete()

        return JsonResponse({"message": "Email verified"}, status=200)
    
def resend_email_verification_code(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)

    verification_data = VerificationData.objects.filter(user=user, field="email").first()

    if verification_data is None:
        raise VerificationException("Email is already verified", 409)
    
    if not verification_data.can_request_new_code():
        raise VerificationException("You need to wait 5 minutes to request a new verification code", 429)
    
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data.code = make_password(verification_code)
    verification_data.save()

    logging.info(f"Verification code for {user.email}: {verification_code}")

    return JsonResponse({"message": "Verification code sent"}, status=200)

def get_user_by_unknown_credential(credential: str) -> Optional[User]:
    credential_type = AuthenticationUtils.determine_credential_type(credential)

    if credential_type == "email":
        return User.objects.filter(email=credential).first()
    elif credential_type == "phone":
        return User.objects.filter(phone=credential).first()
    
    return None

def generate_and_send_password_reset_token(request: HttpRequest) -> JsonResponse:
    json = JSONParser().parse(request)
    credential = json.get('credential')
    user = get_user_by_unknown_credential(credential)

    if user is None:
        raise UserDoesNotExistException()
    
    password_reset_token: str = AuthenticationUtils.generate_verification_code()

    user.password_reset_token = make_password(password_reset_token)
    user.password_reset_token_created_at = timezone.now()

    print(f"Password reset token for {user.email}: {password_reset_token}")

    #send email or sms

    user.save()

    return JsonResponse({"message": "Password reset token sent"}, status=200)

def reset_password(request: HttpRequest) -> JsonResponse:
    json = JSONParser.parse(request)
    data = ResetPasswordSerializer(data=json)

    data.validate()

    user = get_user_by_unknown_credential(data.credential)

    if user is None:
        raise UserDoesNotExistException()
    
    if not check_password(data.password_reset_token, user.password_reset_token):
        raise ResetPasswordException("Invalid password reset token", 400)
    
    user.reset_password(data.new_password)

    return JsonResponse({"message": "Password reset successful"}, status=200)