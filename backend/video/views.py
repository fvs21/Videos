import os
from django.http import FileResponse, HttpResponse

from video.models import Video
from video.service import get_video_playlist, retrieve_video_segment
# Create your views here.

def serve_video_playlist(request, video_id, resolution):
    playlist = get_video_playlist(video_id, resolution)
    return HttpResponse(playlist, content_type="application/vnd.apple.mpegurl")

def serve_video_segment(request, video_id, resolution, segment):
    segment_path = retrieve_video_segment(video_id, resolution, segment)
    return FileResponse(open(segment_path, "rb"), content_type="video/mp2t")