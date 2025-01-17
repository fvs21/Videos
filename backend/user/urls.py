from django.urls import path
from . import views

urlpatterns = [
    path("pfp/update", views.UserViewSet.as_view({"patch": "update_pfp"}), name="update_pfp"),
]