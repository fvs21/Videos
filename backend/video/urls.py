from django.urls import path
from . import views

urlpatterns = [
    path("playlist/<int:video_id>/<str:resolution>/playlist.m3u8", views.serve_video_playlist, name="serve_video_playlist"),
    path("segment/<int:video_id>/<str:resolution>/<str:segment>/", views.serve_video_segment, name="serve_video_segment"),
]   