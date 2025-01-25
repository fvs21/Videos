from django.http import HttpRequest, JsonResponse
from authentication.service import get_user_by_id
from post.models import Post
from post.serializers import CreatePostSerializer
from rest_framework.parsers import JSONParser
import json

from video.service import store_video

def create_post(request: HttpRequest) -> Post:
    user = get_user_by_id(request.user.id)

    json_data = json.loads(request.data['data'])
    video = store_video(request.FILES.get("video"))

    serializer = CreatePostSerializer(data={**json_data, "creator": user.id, "video": video.id})

    serializer.is_valid(raise_exception=True)
    return serializer.save()
