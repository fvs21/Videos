from django.http import HttpRequest
from post.models import Post
from post.serializers import CreatePostSerializer
from user.models import User
from video.models import Video
from django.core.files.uploadedfile import UploadedFile

def create_post(user: User, json_data: dict, video: UploadedFile) -> Post:    
    serializer = CreatePostSerializer(data={**json_data, "creator": user.id, "video_file": video})
    serializer.is_valid(raise_exception=True)
    return serializer.save()

