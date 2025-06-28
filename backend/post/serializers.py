from math import prod
from webbrowser import get
from rest_framework import serializers
from post.models import Comment, Post
from django.core.files.uploadedfile import UploadedFile

from video.service import store_video
from .utils import get_video_duration

class CreatePostSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()

    class Meta:
        model = Post
        fields = [
            "description",
            "creator",
            "video_file"
        ]


    def validate_video_file(self, value: UploadedFile):
        if not value.content_type in ['video/mp4', 'video/mov']:
            raise serializers.ValidationError("Unsupported video file type")

        duration = get_video_duration(value.file.name)

        if duration > 60000:
            raise serializers.ValidationError("Video duration is more than 1 minute")    
        
        return value

    def create(self, validated_data: dict) -> Post:
        video = store_video(validated_data.get("video_file"))
        
        post = Post.objects.create(
            description=validated_data.get("description"),
            video=video,
            creator=validated_data.get("creator"),
        )

        post.save()

        return post
    
class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = [
            "id",
            "description",
            "video",
            "creator",
            "likes",
            "created_at",
        ]

class CommentSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Comment
        fields = [
            'id',
            'comment',
            'creator',
            'likes',
            'created_at'
        ]