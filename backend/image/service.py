from django.http import Http404, HttpResponse

from image.exceptions import ImageUploadException
from .models import Image
from django.core.files.uploadedfile import UploadedFile
from django.utils.deconstruct import deconstructible
import uuid
import os

def random_file_name(container, filename) -> str:
    extension = os.path.splitext(filename)[1]
    return container + str(uuid.uuid4()) + extension

def download_image(image_name: str):
    try:
        image = Image.objects.get(image_name=image_name)
        return HttpResponse(image.image, content_type=image.image_type)
    except Image.DoesNotExist:
        raise Http404
    
def check_if_valid_image_type(image: UploadedFile) -> None:
    return image.content_type in ['image/jpeg', 'image/jpg', 'image/png']

def upload_image(image: UploadedFile, container: str) -> Image:
    if not check_if_valid_image_type(image):
        raise ImageUploadException("Invalid image type", 400)
    
    image_name = random_file_name(container, image.name)

    created_image = Image(
        image=image, 
        image_name=image_name, 
        image_type=image.content_type, 
        container=container,
        image_url = "/api/image/" + str(image_name)
    )
    
    created_image.save()

    return created_image