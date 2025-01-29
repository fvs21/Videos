from rest_framework import serializers
from django.core.files.uploadedfile import UploadedFile
from store.models import Product, Store
from image.service import create_image

class CreateStoreSerializer(serializers.ModelSerializer):
    '''
    serializer for creating a new store
    '''
    picture = serializers.ImageField()

    class Meta:
        model = Store
        fields = ["name", "owner"]

    def validate_picture(self, value: UploadedFile):
        if not value.content_type in ["image/jpeg", "image/png", "image/jpg"]:
            raise serializers.ValidationError("Invalid image type")
        return value
    

class CreateProductSerializer(serializers.ModelSerializer):
    '''
    serializer for creating a new product in a given store
    '''    
    images = serializers.ListField(child=serializers.ImageField())

    class Meta:
        model = Product
        fields = ["name", "description", "price", "store", "images"]

    def create(self, validated_data):
        image_objects = [
            create_image(img) for img in validated_data.get('images')
        ]

        product = Product.objects.create(
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            price=validated_data.get('price'),
            store=validated_data.get('store'),
            images=image_objects
        )

        return product
    
class ProductSerializer(serializers.ModelSerializer):
    '''
    serializer for getting relevant fields in a product for display
    '''
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "store"]


class StoreSerializer(serializers.ModelSerializer):
    '''
    serializer for displaying the store
    '''
    products = ProductSerializer(many=True)

    class Meta:
        model = Store
        fields = [
            "id", 
            "name", 
            "owner", 
            "store_picture_url",
            "products"
        ]