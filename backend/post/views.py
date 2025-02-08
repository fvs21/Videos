import json
from django.http import HttpRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from authentication.service import get_user_by_id
from post.serializers import CommentSerializer, PostSerializer
from rest_framework.parsers import JSONParser

from . import service

class AuthenticatedPostsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    @action(detail=False, methods=["POST"])
    def create_post(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)
        json_data = json.loads(request.data['data'])
        video = request.FILES.get("video")

        post = service.create_post(user, json_data, video)

        serializer = PostSerializer(post)
        return JsonResponse({"post": serializer.data}, status=201)

    @action(detail=False, methods=["POST"])
    def like_post(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        json_data = JSONParser().parse(request)

        service.like_post(user, json_data.get("post_id"))
        return JsonResponse({"message": "Post liked successfully"}, status=200)
    
    @action(detail=False, methods=["GET"])
    def comment_post(self, request: HttpRequest) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        json_data = JSONParser().parse(request)

        comments = service.comment_on_post(user, json_data.get("comment"), json_data.get("post_id"))

        return JsonResponse({"comments": comments}, status=200)

    @action(detail=False, methods=["DELETE"])
    def delete_comment(self, request: HttpRequest, post_id: int) -> JsonResponse:
        user = get_user_by_id(request.user.id)

        json_data = JSONParser().parse(request)

        service.delete_comment(user, post_id, json_data.get("comment_id"))

        return JsonResponse({"message": "Comment deleted successfully"}, status=200)
    
class PostsView(viewsets.ViewSet):
    @action(detail=False, methods=["GET"])
    def get_post_comments(self, request: HttpRequest, post_id: int) -> JsonResponse:
        comments = service.get_post_comments(post_id)

        return JsonResponse({"comments": CommentSerializer(comments, many=True).data}, status=200) 