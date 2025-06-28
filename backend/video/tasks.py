import os
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
        resolutions: list[str] = ["v0", "v1", "v2"]

        base_segments_url = "http://localhost:8000/api/video/segment"

        for resolution in resolutions:
            create_directory(f"{base_path}/{resolution}")

        '''
            this command is used to generate all of the resolutions of the video
            the ts file (transport stream) is the splitted chunks of the video extension
            the m3u8 file is the master playlist that contains all of the resolutions and the chunks
            v0 is the 1080p resolution
            v1 is the 720p resolution
            v2 is the 480p resolution
        '''
        command: list = [
            "ffmpeg",
            "-i", video.original_video.path,

            # Video/Audio mapping and encoding for 1080p
            "-map", "v:0",
            "-s:v:0", "1920x1080",
            "-c:v:0", "libx264",
            "-b:v:0", "5000k",
            "-maxrate:v:0", "5350k",
            "-bufsize:v:0", "7500k",

            "-map", "a:0",
            "-c:a:0", "aac",
            "-b:a:0", "128k",
            "-ac", "2",

            # Video/Audio mapping and encoding for 720p
            "-map", "v:0",
            "-s:v:1", "1280x720",
            "-c:v:1", "libx264",
            "-b:v:1", "2800k",
            "-maxrate:v:1", "2996k",
            "-bufsize:v:1", "4200k",

            "-map", "a:0",
            "-c:a:1", "aac",
            "-b:a:1", "128k",
            "-ac", "2",

            # Video/Audio mapping and encoding for 480p
            "-map", "v:0",
            "-s:v:2", "854x480",
            "-c:v:2", "libx264",
            "-b:v:2", "800k",
            "-maxrate:v:2", "856k",
            "-bufsize:v:2", "1200k",

            "-map", "a:0",
            "-c:a:2", "aac",
            "-b:a:2", "96k",
            "-ac", "2",

            # This is key: give each variant a name so %v = the resolution string
            # rather than the index. That way, subfolders are named "1080p", "720p", "480p".
            "-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2",

            # Master playlist filename
            "-master_pl_name", "master.m3u8",

            # HLS segment settings
            "-f", "hls",
            "-hls_time", "6",
            "-hls_list_size", "0",
            "-hls_base_url", os.path.join(base_segments_url, str(video_id), "{{ resolution }}/"),

            # The pattern for the .ts segments and variant playlists
            # %v is replaced with the resolution name we assigned above.
            "-hls_segment_filename", f"{base_path}/v%v/segment_%03d.ts", f"{base_path}/v%v/playlist.m3u8"
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