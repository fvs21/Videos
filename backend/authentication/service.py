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

logging.basicConfig(level=logging.INFO)

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
            "access_token": tokens["access_token"],
            "refresh_token": tokens["refresh_token"]
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

def register_user(request: HttpRequest) -> User:
    json = JSONParser().parse(request)
    data = RegistrationSerializer(data=json)

    if not data.is_valid():
        raise RegistrationException(data.errors, 400)
    
    user = data.save()

    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data = VerificationData(user=user, field="email", code=make_password(verification_code))
    verification_data.save()

    logging.info(f"Verification code for {user.email}: {verification_code}")

    return user


def login_user(request: HttpRequest) -> Optional[User]:
    json = JSONParser().parse(request)
    username = json.get("username")
    password = json.get("password")

    return authenticate(username=username, password=password)

def get_session(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)
    return JsonResponse(UserSerializer(user).data, status=200)

def get_user_by_id(id: int) -> User:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise UserDoesNotExistException(status_code=404)
    
def process_refresh_token(refresh_token: str) -> Optional[RefreshToken]:
    if not refresh_token:
        raise None
        
    try:
        token = RefreshToken(refresh_token)
        if token.check_blacklist():
            raise RefreshTokenException("Token blacklisted", 409)
        return token
    except Exception:
        return None

def logout_session(request: HttpRequest) -> None:
    refresh_token = request.COOKIES.get("user_r")

    newToken = RefreshToken(refresh_token)
    newToken.blacklist()

def mobile_logout_session(request: HttpRequest) -> None:
    auth = request.headers.get("Authorization", '')
    refresh_token = auth.replace('Bearer ', '')

    newToken = RefreshToken(refresh_token)
    newToken.blacklist()

def check_email_verification(request: HttpRequest) -> bool:
    user: User = get_user_by_id(request.user.id)

    verification_data = VerificationData.objects.filter(user=user, field="email").first()

    if verification_data is None:
        raise VerificationException("Email is already verified", 409) 
    
    json = JSONParser().parse(request)
    verification_code = json.get("code")

    if verification_code is None:
        raise VerificationException("No verification code provided", 400)
    
    if not check_password(verification_code, verification_data.code):
        return False
    
    if verification_data.is_code_expired():
        raise VerificationException("Verification code expired", 400)
    
    user.email_verified_at = timezone.now()
    user.save()

    verification_data.delete()
    return True

def resend_email_verification_code(request: HttpRequest) -> bool:
    user: User = get_user_by_id(request.user.id)

    verification_data = VerificationData.objects.filter(user=user, field="email").first()

    if verification_data is None:
        raise VerificationException("Email is already verified", 409)
    
    if not verification_data.can_request_new_code():
        return False
    
    verification_code = AuthenticationUtils.generate_verification_code()
    verification_data.code = make_password(verification_code)
    verification_data.save()

    logging.info(f"Verification code for {user.email}: {verification_code}")

    return True

def get_user_by_unknown_credential(credential: str) -> Optional[User]:
    credential_type = AuthenticationUtils.determine_credential_type(credential)

    if credential_type == "email":
        return User.objects.filter(email=credential).first()
    elif credential_type == "phone":
        return User.objects.filter(phone=credential).first()
    
    return None

def generate_and_send_password_reset_token(request: HttpRequest) -> bool:
    json = JSONParser().parse(request)
    credential = json.get('credential')
    user = get_user_by_unknown_credential(credential)

    if user is None:
        return False
    
    password_reset_token: str = AuthenticationUtils.generate_verification_code()

    user.password_reset_token = make_password(password_reset_token)
    user.password_reset_token_created_at = timezone.now()

    logging.info(f"Password reset token for {user.email}: {password_reset_token}")

    #send email or sms

    user.save()
    return True

def reset_password(request: HttpRequest) -> bool:
    json = JSONParser.parse(request)
    data = ResetPasswordSerializer(data=json)

    if not data.is_valid():
        raise ResetPasswordException(data.errors, 400)

    user = get_user_by_unknown_credential(data.credential)

    if user is None:
        raise UserDoesNotExistException()
    
    if not check_password(data.password_reset_token, user.password_reset_token):
        return False
    
    user.reset_password(data.new_password)

    return True

def check_username_availability(request: HttpRequest) -> bool:
    username = request.GET.get("username")
    return User.objects.filter(username=username).exists()