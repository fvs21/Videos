from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.http import HttpRequest
from django.http import JsonResponse

from authentication.exceptions import RefreshTokenException
from user.models import User
from . import service
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from backend.permissions import OnlyGuests

class AuthenticationViewSet(viewsets.ViewSet):
    permission_classes = [OnlyGuests]

    @action(methods=["POST"], detail=False)
    def login(self, request: HttpRequest) -> JsonResponse:
        user = service.login_user(request)
        response = service.generate_authentication_response(user)
        response.status_code = 200
        return response

    @action(methods=["POST"], detail=False)
    def register(self, request: HttpRequest) -> JsonResponse:
        user: User = service.register_user(request)
        return service.generate_authentication_response(user)
    
    @action(methods=["POST"], detail=False)
    def forgot_password(self, request: HttpRequest) -> JsonResponse:
        result: bool = service.generate_and_send_password_reset_token(request)

        if result:
            return JsonResponse({"message", "Password reset token sent"}, status=200)
        
        return JsonResponse({"message", "User was not found"}, status=404)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        result: bool = service.reset_password(request)

        if result:
            return JsonResponse({"message": "Password reset successful"}, status=200)
        
        return JsonResponse({"message", "Password reset failed"}, status=400)


class AuthenticatedAuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=["GET"], detail=False)
    def session(self, request: HttpRequest) -> JsonResponse:
        return service.get_session(request)

    @action(methods=["POST"], detail=False)
    def logout(self, request: HttpRequest) -> JsonResponse:
        service.logout_session(request)
        return JsonResponse({"message", "Succesfully logged out"}, status=200)
    
    @action(methods=["POST"], detail=False)
    def mobile_logout(self, request: HttpRequest) -> JsonResponse:
        service.mobile_logout_session(request)
        return JsonResponse({"message", "Succesfully logged out"}, status=200)
    
    @action(methods=["POST"], detail=False)
    def verify_email(self, request: HttpRequest) -> JsonResponse:
        result: bool = service.check_email_verification(request)

        if result:
            return JsonResponse({"message", "Email successfully verified"}, status=200)
        
        return JsonResponse({"message", "Incorrect verification code"}, status=400)
    
    @action(methods=['POST'], detail=False)
    def request_email_verification_code(self, request: HttpRequest) -> JsonResponse:
        result: bool = service.resend_email_verification_code(request)

        if result:
            return JsonResponse({"message", "Verification code sent"}, status=200)
        
        return JsonResponse({"message", "You need to wait 5 minutes to request a new verification code"}, status=429)

    
@api_view(["GET"])
def refresh(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")
    token = service.process_refresh_token(refresh_token)
    return JsonResponse({"access_token": str(token.access_token)}, status=200)

@api_view(["GET"])
@permission_classes([AllowAny]) #change to isauthenticated for mobile
@authentication_classes([])
def mobile_refresh(request: HttpRequest) -> JsonResponse:
    auth = request.headers.get("Authorization", '')

    if auth is None:
        raise RefreshTokenException("No authorization header provided", 401)

    refresh_token = auth.replace('Bearer ', '')

    token = service.process_refresh_token(refresh_token)
    return JsonResponse({"access_token": str(token.access_token)}, status=200)

@api_view(["GET"])
def username_available(request: HttpRequest) -> JsonResponse:
    available: bool = service.check_username_availability(request)

    if available:
        return JsonResponse({"available": True}, status=200)
    
    return JsonResponse({"available": False}, status=400)