from .serializers import RegistrationSerializer
from django.http import JsonResponse
from . import exceptions

def register_user(data: RegistrationSerializer):
    if not data.is_valid():
        raise exceptions.RegistrationException()
