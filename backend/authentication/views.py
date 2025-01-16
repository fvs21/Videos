from django.shortcuts import render
from django.views import View
from rest_framework.decorators import api_view
from django.http import HttpRequest
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from . import service
from .serializers import RegistrationSerializer


@api_view(["POST"])
def login(request):
    pass

@api_view(["POST"])
def register(request: HttpRequest) -> JsonResponse:
    data = JSONParser().parse(request)
    return service.register_user(RegistrationSerializer(data))


@api_view(["POST"])
def logout(request):
    pass