from django.http import HttpRequest
from authentication.service import get_user_by_id
from post.models import Post
from post.serializers import CreatePostSerializer
import json

def create_post(request: HttpRequest) -> Post:
    user = get_user_by_id(request.user.id)

    json_data = json.loads(request.data['data'])
    
    serializer = CreatePostSerializer(data={**json_data, "creator": user.id, "video_file": request.FILES.get("video")})
    serializer.is_valid(raise_exception=True)
    return serializer.save()