from image.service import upload_image
from store.exceptions import StoreDoestNotExist, UnableToCreateProductException, UnableToEditStore
from store.models import Product, Store
from store.serializers import CreateProductSerializer, CreateStoreSerializer, StoreSerializer
from user.models import User
from django.core.files.uploadedfile import UploadedFile

def create_store(user: User, json_data: dict, image: UploadedFile) -> Store:
    serializer = CreateStoreSerializer(data={**json_data, "owner": user.id, "picture": image})
    serializer.is_valid(raise_exception=True)

    return serializer.save()

def create_product(user: User, json_data: dict, images: list[UploadedFile]) -> Product:
    store = get_user_store(user)
    
    if not store:
        raise UnableToCreateProductException('User has not created a store.', 404)

    serializer = CreateProductSerializer(data={**json_data, "images": images, "store": store.id})
    
    if not serializer.is_valid():
        raise UnableToCreateProductException(serializer.errors, 400)
    
    return serializer.save()

def get_user_store(user: User) -> Store:
    return Store.objects.filter(owner=user).first()

def edit_store_name(user: User, new_name: str) -> Store:
    store = get_user_store(user)

    if not store:
        raise StoreDoestNotExist('User doesn\'t have a store', 404)
    
    store.name = new_name
    store.save()
    return store

def edit_store_picture(user: User, new_picture: UploadedFile) -> Store:
    store = get_user_store(user)

    if not store:
        raise StoreDoestNotExist('User doesn\'t have a store', 404)
    
    picture = upload_image(new_picture)

    if picture is None:
        raise UnableToEditStore('Unable to upload image', 500)

    store.set_store_picture(picture)
    return store

def get_store_by_id(store_id: int) -> Store:
    return Store.objects.filter(id=store_id).first()

def get_product_by_id(product_id: int) -> Product:
    return Product.objects.filter(id=product_id).first()