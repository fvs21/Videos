from rest_framework import serializers
from post.models import Post
from django.core.files.uploadedfile import UploadedFile

from video.service import store_video

class CreatePostSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()

    class Meta:
        model = Post
        fields = [
            "description",
            "creator",
            "products"
        ]

    def validate_video_file(self, value: UploadedFile):
        if not value.content_type in ['mp4', 'mov']:
            raise serializers.ValidationError("Unsupported video file type")
        return value

    def create(self, validated_data: dict) -> Post:
        video = store_video(validated_data.get("video_file"))
        
        post = Post.objects.create(
            description=validated_data.get("description"),
            video=video,
            creator=validated_data.get("creator")
        )
        return post
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "description",
            "video",
            "creator",
            "likes",
            "created_at"
        ]