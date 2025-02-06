from hmac import new
import re
from rest_framework import serializers
from django.core.files.uploadedfile import UploadedFile
from store.models import Product, Store
from image.service import upload_image
from user.models import User

class CreateStoreSerializer(serializers.ModelSerializer):
    '''
    serializer for creating a new store
    '''
    store_picture = serializers.ImageField(required=False)

    class Meta:
        model = Store
        fields = ["owner", "name", "store_picture"]
        extra_kwargs = {
            'name': {
                'required': False,
                'allow_blank': True
            }
        }

    def validate_owner(self, value: User):
        if Store.objects.filter(owner=value).exists():
            raise serializers.ValidationError("User has already created a store")
        
        return value

    def validate_name(self, value: str):
        if not value:
            owner_id = self.initial_data.get('owner')
            owner = User.objects.get(id=owner_id)

            new_name = f"{owner.username}'s Store"
            if len(new_name) > 23:
                return "Store"

            return new_name
        
        return value

    def validate_store_picture(self, value: UploadedFile):
        if not value:
            return value
        
        if not value.content_type in ["image/jpeg", "image/png", "image/jpg"]:
            raise serializers.ValidationError("Invalid image type")
        return value
    
    def create(self, validated_data):
        picture = upload_image(validated_data.get('store_picture')) if validated_data.get('store_picture') else None

        store = Store.objects.create(
            owner=validated_data.get('owner'),
            name=validated_data.get('name'),
            store_picture=picture
        )
        return store
    
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
            upload_image(img) for img in validated_data.get('images')
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
        fields = [
            "id", 
            "name", 
            "description", 
            "price", 
            "images_urls", 
            "store"
        ]


class StoreSerializer(serializers.ModelSerializer):
    '''
    serializer for displaying the store
    '''
    products = ProductSerializer(many=True)

    owner_username = serializers.SerializerMethodField()
    owner_full_name = serializers.SerializerMethodField()
    owner_pfp_url = serializers.SerializerMethodField()

    def get_owner_username(self, obj: Store) -> str:
        return obj.owner.username
    
    def get_owner_full_name(self, obj: Store) -> str:
        return obj.owner.full_name
    
    def get_owner_pfp_url(self, obj: Store) -> str:
        return obj.owner.pfp_url()

    class Meta:
        model = Store
        fields = [
            "id", 
            "name",
            "store_picture_url",
            "products",
            "owner_username",
            "owner_full_name",
            "owner_pfp_url"
        ]