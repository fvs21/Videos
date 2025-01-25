from django.urls import path
from . import views

urlpatterns = [
    path("follow", views.FriendshipViewSet.as_view({"post": "send_follow_request"}), name="send_follow_request"),
]