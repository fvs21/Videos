from store.exceptions import UnableToCreateProductException
from store.models import Product, Store
from store.serializers import CreateProductSerializer, CreateStoreSerializer
from user.models import User
from django.core.files.uploadedfile import UploadedFile

def create_store(user: User, json_data: dict, image: UploadedFile) -> Store:
    serializer = CreateStoreSerializer(data={**json_data, "owner": user.id, "picture": image})
    serializer.is_valid(raise_exception=True)

    return serializer.save()

def create_product(user: User, json_data: dict, images: list[UploadedFile]) -> Product:
    store_id: int = json_data.get('store')
    store = Store.objects.filter(id=store_id).first()
    
    if not store:
        raise UnableToCreateProductException('Store not found', 404)

    if store.owner != user:
        raise UnableToCreateProductException('You are not authorized to create a product for this store', 403)

    serializer = CreateProductSerializer(data={**json_data, "images": images})
    
    if not serializer.is_valid():
        raise UnableToCreateProductException(serializer.errors, 400)
    
    return serializer.save()