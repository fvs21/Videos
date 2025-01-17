from .serializers import RegistrationSerializer, UserSerializer
from django.http import JsonResponse
from .exceptions import RegistrationException, AuthenticationException, UserDoesNotExistException
from django.http import HttpRequest
from rest_framework.parsers import JSONParser
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from backend.settings import REFRESH_TOKEN_DURATION
from django.contrib.auth import authenticate

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
    return generate_authentication_response(user)


def login_user(request: HttpRequest) -> JsonResponse:
    json = JSONParser().parse(request)
    print(json)
    username = json.get("username")
    password = json.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        raise AuthenticationException("Invalid credentials", 400)
    
    response = generate_authentication_response(user)
    response.status_code = 200
    return response

def get_session(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)
    return JsonResponse(UserSerializer(user).data, status=200)

def get_user_by_id(id: int) -> User | None:
    try:
        return User.objects.get(id=id)
    except User.DoesNotExist:
        raise UserDoesNotExistException(status_code=404)
    
def refresh_token(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")

    newToken = RefreshToken(refresh_token)
    return JsonResponse({"access_token": str(newToken.access_token)}, status=200)

def logout_user(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")

    newToken = RefreshToken(refresh_token)
    newToken.blacklist()
    return JsonResponse({"message", "Succesfully logged out"}, status=200)