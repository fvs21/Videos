from celery import shared_task
import subprocess
from pathlib import Path
import logging
from video.models import Video, VideoResolution

logging.basicConfig(level=logging.INFO)

@shared_task
def process_video_task(video_id: int) -> None:
    '''
    method to process the video. Creates the master playlist, and using ffmpeg, creates 
    many resolutions of the video and splits each one into chunks.
    resolutions: 240p, 480p, 720p
    '''
    try:
        video = Video.objects.get(id=video_id)
        base_path: str = f"videos/processed/{video_id}"
        master_playlist_path: str = f"{base_path}/master.m3u8"
        resolutions: list[str] = ["240p", "480p", "720p"]

        for resolution in resolutions:
            create_directory(f"{base_path}/{resolution}")

        '''
            this command is used to generate all of the resolutions of the video
            the ts file (transport stream) is the splitted chunks of the video extension
            the m3u8 file is the master playlist that contains all of the resolutions and the chunks
        '''
        command: list = [
            "ffmpeg", "-i", video.original_video.path,

            #generate 240p resolution
            "-vf", "scale=w=426:h=240", "-c:v", "libx265", "-preset", "medium", "-crf", "28",
            "-hls_time", "10", "-hls_playlist_type", "vod",
            "-hls_segment_filename", f"{base_path}/240p/chunk_%03d.ts",
            f"{base_path}/240p/playlist.m3u8",

            #generate 480p resolution
            "-vf", "scale=w=854:h=480", "-c:v", "libx265", "-preset", "medium", "-crf", "28",
            "-hls_time", "10", "-hls_playlist_type", "vod",
            "-hls_segment_filename", f"{base_path}/480p/chunk_%03d.ts",
            f"{base_path}/480p/playlist.m3u8",

            #generate 720p resolution
            "-vf", "scale=w=1280:h=720", "-c:v", "libx265", "-preset", "medium", "-crf", "28",
            "-hls_time", "10", "-hls_playlist_type", "vod",
            "-hls_segment_filename", f"{base_path}/720p/chunk_%03d.ts",
            f"{base_path}/720p/playlist.m3u8",

            #generate master playlist
            "-master_pl_name", master_playlist_path,
        ]
        logging.info(f"Processing video {video_id}")

        subprocess.run(command, check=True)

        for resolution in resolutions:
            create_resolution_object(video, f"{base_path}/{resolution}")

        video.master_playlist = master_playlist_path
        video.status = "completed"
        video.save()
    except Exception as e:
        video.status = "failed"
        video.save()

def create_directory(path: str):
    '''
    create a directory at the given path
    '''
    Path(path).mkdir(parents=True, exist_ok=True)

def create_resolution_object(video: Video, path: str) -> VideoResolution:
    '''
    create a video resolution object for the given video and path
    '''
    resolution_path = Path(path)
    chunk_count = len(list(resolution_path.glob("*.ts")))

    return VideoResolution.objects.create(
        video=video,
        resolution=resolution_path.name,
        chunk_count=chunk_count
    )
