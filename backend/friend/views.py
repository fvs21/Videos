from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser

from friend import service
from friend.models import Friendship

# Create your views here.
class FriendshipViewSet(viewsets.ViewSet):
    queryset = Friendship.objects.all()

    @action(methods=["POST"], detail=False)
    def send_follow_request(self, request: HttpRequest) -> JsonResponse:
        json = JSONParser().parse(request)
        return service.request_to_follow(json)