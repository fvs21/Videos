from django.urls import path
from . import views

urlpatterns = [
    path("create", views.PostsView.as_view({"post": "create_post"}), name="create_post")
]