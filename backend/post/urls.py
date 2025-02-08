from django.urls import path
from . import views

urlpatterns = [
    path("create", views.AuthenticatedPostsView.as_view({"post": "create_post"}), name="create_post"),
    path("like", views.AuthenticatedPostsView.as_view({"post": "like_post"}), name="like_post"),
    path("comment", views.AuthenticatedPostsView.as_view({"post": "comment_post"}), name="comments"),
    path("comment/<int:post_id>", views.AuthenticatedPostsView.as_view({"delete": "delete_comment"}), name="delete_comment"),
    path("comments/<int:post_id>", views.PostsView.as_view({"get": "get_post_comments"}), name="get_post_comments"),
]