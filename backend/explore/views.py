from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets

from authentication.service import get_user_by_id
from explore import service
from post.serializers import PostSerializer

# Create your views here.
class ExploreViewSet(viewsets.ViewSet):
    def all(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        posts = service.get_all_posts(user)

        return JsonResponse(
            PostSerializer(posts, many=True).data,
            safe=False,
        
        )
    def feed(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        posts = service.get_personalized_feed(user)

        return JsonResponse(
            PostSerializer(posts, many=True).data,
        )