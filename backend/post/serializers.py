from rest_framework import serializers

from post.models import Post
from video.service import store_video

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["description", "video", "creator"]

    def create(self, validated_data: dict) -> Post:
        post = Post.objects.create(
            description=validated_data.get("description"),
            video=validated_data.get("video"),
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