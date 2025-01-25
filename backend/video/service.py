import os
import uuid
from video.models import Video
from django.core.files.uploadedfile import UploadedFile, InMemoryUploadedFile
from . tasks import process_video_task

def generate_video_name(file: UploadedFile) -> str:
    extension = os.path.splitext(file.name)[1]
    return f"{uuid.uuid4()}{extension}"

def store_video(file: UploadedFile) -> Video:
    '''
    store the data as a video object in the database
    begin the processing of the video
    '''
    video_name = generate_video_name(file)
    video = Video.objects.create(name=video_name, original_video=file)
    process_video_task.delay(video.id)
    return video