from django.urls import path
from . import views

urlpatterns = [
    path("create", views.AuthenticatedPostsView.as_view({"post": "create_post"}), name="create_post")
]