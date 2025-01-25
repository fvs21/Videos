from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from post.serializers import PostSerializer

from . import service

# Create your views here.
class PostsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=["POST"])
    def create_post(self, request: HttpRequest) -> JsonResponse:
        post = service.create_post(request)
        serializer = PostSerializer(post)
        return JsonResponse({"post": serializer.data}, status=201)