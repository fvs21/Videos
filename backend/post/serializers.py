from math import prod
from webbrowser import get
from rest_framework import serializers
from post.models import Comment, Post
from django.core.files.uploadedfile import UploadedFile

from store.models import Product
from store.serializers import ProductSerializer
from video.service import store_video
from .utils import get_video_duration

class CreatePostSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()
    products = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Post
        fields = [
            "description",
            "creator",
            "products",
            "video_file"
        ]

    def validate_products(self, value: list) -> list:
        for product_id in value:
            product = Product.objects.filter(id=product_id).first()

            if not product:
                raise serializers.ValidationError(f"Product with id {product_id} does not exist")
            
            creator = self.initial_data.get("creator")

            if not product.store.owner.id == creator:
                raise serializers.ValidationError(f"Product with id {product_id} does not belong to the creator")
            

        return value

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
            creator=validated_data.get("creator")
        )

        post.products.set(validated_data.get("products"))
        post.save()

        return post
    
class PostSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    
    class Meta:
        model = Post
        fields = [
            "id",
            "description",
            "video",
            "creator",
            "likes",
            "created_at",
            'products'
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