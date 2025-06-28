import os
import uuid

from django.http import Http404
from video.exceptions import UnableToUploadVideoException, VideoFetchingException
from video.models import Video
from django.core.files.uploadedfile import UploadedFile
from . tasks import process_video_task

def generate_video_name(file: UploadedFile) -> str:
    extension = os.path.splitext(file.name)[1]
    return f"{uuid.uuid4()}{extension}"

def store_video(file: UploadedFile) -> Video:
    '''
    store the data as a video object in the database
    begin the processing of the video
    '''

    if not file.content_type in ['video/mp4', 'video/mov']:
        raise UnableToUploadVideoException("Unsupported video file type", 400)

    video_name = generate_video_name(file)
    video = Video.objects.create(name=video_name, original_video=file)
    process_video_task.delay(video.id)
    return video

def get_video_playlist(video_id: int, resolution: str) -> str:
    video = Video.objects.filter(id=video_id).first()

    if not video:
        raise Http404("Video not found")
    
    if video.status == "processing":
        raise VideoFetchingException("Video is still processing")
    
    path = f"videos/processed/{video.id}/{resolution}"
    playlist_path = os.path.join(path, "playlist.m3u8")

    with open(playlist_path, "r") as file:
        playlist = file.read()
        playlist = playlist.replace("{{ resolution }}", resolution)
        return playlist
    
def retrieve_video_segment(video_id: int, resolution: str, segment: str) -> str:
    video = Video.objects.filter(id=video_id).first()

    if not video:
        raise Http404("Video not found")
    
    video_path = f"videos/processed/{video.id}"
    segment_path = os.path.join(video_path, resolution, segment)
    return segment_path