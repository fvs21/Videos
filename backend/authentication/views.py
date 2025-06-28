from rest_framework.decorators import api_view
from django.http import HttpRequest
from django.http import JsonResponse

from user.models import User
from . import service
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from backend.permissions import OnlyGuests

class AuthenticationViewSet(viewsets.ViewSet):
    permission_classes = [OnlyGuests]

    @action(methods=["POST"], detail=False)
    def login(self, request: HttpRequest) -> JsonResponse:
        user = service.login_user(request)

        if not user:
            return JsonResponse({"error": True, "message": "Invalid credentials"}, status=400)
        
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
            return JsonResponse({"error": False, "message": "Password reset token sent"}, status=200)
        
        return JsonResponse({"error": True, "message": "User was not found"}, status=404)

    @action(methods=['POST'], detail=False)
    def reset_password(self, request: HttpRequest) -> JsonResponse:
        result: bool = service.reset_password(request)

        if result:
            return JsonResponse({"error": False, "message": "Password reset successful"}, status=200)
        
        return JsonResponse({"error": True, "message": "Invalid password reset token"}, status=400)


class AuthenticatedAuthViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(methods=["GET"], detail=False)
    def session(self, request: HttpRequest) -> JsonResponse:
        return service.get_session(request)

    @action(methods=["POST"], detail=False)
    def logout(self, request: HttpRequest) -> JsonResponse:
        service.logout_session(request)
        return JsonResponse({"error": False, "message": "Succesfully logged out"}, status=200)
    

    
@api_view(["GET"])
def refresh(request: HttpRequest) -> JsonResponse:
    refresh_token = request.COOKIES.get("user_r")
    token = service.process_refresh_token(refresh_token)

    if not token:
        return JsonResponse({"error": True, "message": "Invalid or missing refresh token"}, status=401)
    
    return JsonResponse({"error": False, "access_token": str(token.access_token)}, status=200)

@api_view(["GET"])
def username_available(request: HttpRequest) -> JsonResponse:
    available: bool = service.check_username_availability(request)

    if available:
        return JsonResponse({"available": True}, status=200)
    
    return JsonResponse({"available": False}, status=400)