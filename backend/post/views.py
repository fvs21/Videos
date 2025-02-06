import json
from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from authentication.service import get_user_by_id
from post.serializers import PostSerializer

from . import service

# Create your views here.
class AuthenticatedPostsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=["POST"])
    def create_post(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        json_data = json.loads(request.data['data'])
        video = request.FILES.get("video")

        post = service.create_post(user, json_data, video)
        serializer = PostSerializer(post)
        return JsonResponse({"post": serializer.data}, status=201)
    
