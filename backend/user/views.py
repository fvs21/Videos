from django.http import HttpRequest, JsonResponse
from typing import Optional
from user.models import User
from user.serializers import UserSerializer

from . import service
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['patch'])
    def update_pfp(self, request: HttpRequest) -> JsonResponse:
        user: User = service.update_pfp(request)
        return JsonResponse(UserSerializer(user).data, status=200)
    
    @action(detail=False, methods=['patch'])
    def update_username(self, request: HttpRequest) -> JsonResponse:
        user: Optional[User] = service.update_username(request)

        if user is None:
            return JsonResponse({"error": True, "message": "Username already in use"}, status=409)
        
        return JsonResponse(UserSerializer(user).data, status=200)
