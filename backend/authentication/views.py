from rest_framework.decorators import api_view
from django.http import HttpRequest
from django.http import JsonResponse
from . import service
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from backend.permissions import OnlyGuests

class AuthenticationViewSet(viewsets.ViewSet):
    permission_classes = [OnlyGuests]

    @action(methods=["POST"], detail=False)
    def login(self, request: HttpRequest) -> JsonResponse:
        return service.login_user(request)

    @action(methods=["POST"], detail=False)
    def register(self, request: HttpRequest) -> JsonResponse:
        return service.register_user(request)
    
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
    def verify_email(self, request: HttpRequest) -> JsonResponse:
        return service.check_email_verification(request)

    
@api_view(["GET"])
def refresh(request: HttpRequest) -> JsonResponse:
    return service.refresh_token(request)