from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from . import service
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def retrieve_image(request: HttpRequest, image_name: str):
    return service.download_image(image_name)

@csrf_exempt
def upload_image(request: HttpRequest):
    service.upload_image(request.FILES['image'], "pfp")
    return JsonResponse({"message": "Image uploaded successfully."})

