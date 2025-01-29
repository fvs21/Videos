from rest_framework import serializers
from django.core.files.uploadedfile import UploadedFile
from video.models import Video
from post.models import Post


class CreatePostSerializer_(serializers.Serializer):
    description = serializers.CharField(max_length=255)
    video = serializers.FileField()
    creator = serializers.IntegerField()

    def validate_video(self, value: UploadedFile) -> Video:
        #check if the video has valid extension and length
        pass

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "description",
            "video",
            "creator",
            "products"
        ]

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