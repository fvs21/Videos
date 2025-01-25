from video.models import Video
from django.core.files.uploadedfile import UploadedFile
from . tasks import process_video_task

def store_video(data: dict) -> Video:
    '''
    store the data as a video object in the database
    begin the processing of the video
    '''
    file: UploadedFile = data.get("file")
    video = Video.objects.create(original_video=file)
    process_video_task.delay(video)
    return video