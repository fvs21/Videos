from rest_framework import serializers
from post.models import Post
from django.core.files.uploadedfile import UploadedFile

from store.models import Product
from store.serializers import ProductSerializer
from video.service import store_video

class CreatePostSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()
    products = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Post
        fields = [
            "description",
            "creator",
            "products"
        ]

    def validate_products(self, value: list) -> list:
        for product_id in value:
            product = Product.objects.filter(id=product_id).first()

            if not product:
                raise serializers.ValidationError(f"Product with id {product_id} does not exist")
            
            creator = self.creator

            if not product.store.creator == creator:
                raise serializers.ValidationError(f"Product with id {product_id} does not belong to the creator")
            

        return value

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
    products = ProductSerializer(many=True)
    
    class Meta:
        model = Post
        fields = [
            "description",
            "video",
            "creator",
            "likes",
            "created_at",
            'products'
        ]