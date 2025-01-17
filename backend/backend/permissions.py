from rest_framework import permissions
from django.http import HttpRequest

class OnlyGuests(permissions.BasePermission):
    message = "Already authenticated"

    def has_permission(self, request: HttpRequest, view):
        if(request.HEADERS.get("Authorization")):
            return False
        
        if(request.COOKIE.get("user_r")):
            return False
        