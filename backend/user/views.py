from django.http import HttpRequest, JsonResponse

from . import service
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['patch'])
    def update_pfp(self, request: HttpRequest) -> JsonResponse:
        return service.update_pfp(request)