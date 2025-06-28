from django.urls import path
from . import views

urlpatterns = [
    path("<int:video_id>/", views.serve_video, name="serve_video"),
    path("<int:video_id>/<str:resolution>/playlist.m3u8", views.serve_video_playlist, name="serve_video_playlist"),
    path("segment/<int:video_id>/<str:resolution>/<str:segment>/", views.serve_video_segment, name="serve_video_segment"),
]