from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.http import HttpRequest
from django.http import JsonResponse

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
        return service.generate_and_send_password_reset_token(request)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        return service.reset_password(request)


class AuthenticatedAuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=["GET"], detail=False)
    def session(self, request: HttpRequest) -> JsonResponse:
        return service.get_session(request)

    @action(methods=["POST"], detail=False)
    def logout(self, request: HttpRequest) -> JsonResponse:
        return service.logout_user(request)
    
    @action(methods=["POST"], detail=False)
    def mobile_logout(self, request: HttpRequest) -> JsonResponse:
        return service.mobile_logout_user(request)
    
    @action(methods=["POST"], detail=False)
    def verify_email(self, request: HttpRequest) -> JsonResponse:
        return service.check_email_verification(request)
    
    @action(methods=['POST'], detail=False)
    def request_email_verification_code(self, request: HttpRequest) -> JsonResponse:
        return service.resend_email_verification_code(request)

    
@api_view(["GET"])
def refresh(request: HttpRequest) -> JsonResponse:
    return service.refresh_token(request)

@api_view(["GET"])
@permission_classes([AllowAny]) #change to isauthenticated for mobile
@authentication_classes([])
def mobile_refresh(request: HttpRequest) -> JsonResponse:
    return service.mobile_refresh_token(request)

@api_view(["GET"])
def username_available(request: HttpRequest) -> JsonResponse:
    available: bool = service.check_username_availability(request)

    if available:
        return JsonResponse({"available": True}, status=200)
    
    return JsonResponse({"available": False}, status=400)