from datetime import datetime
import os
from django.db import models

# Create your models here.

def video_path(instance, filename):
    video_id = instance.name
    return f"videos/originals/{video_id}"

def processed_video_path(instance, filename):
    video_id = instance.id
    return f"videos/processed/{video_id}/{filename}"

class Video(models.Model):
    status_choices = [
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]
    name = models.CharField(max_length=40)
    status = models.CharField(max_length=10, choices=status_choices, default="processing")
    original_video = models.FileField(upload_to=video_path) #path to the original video
    master_playlist = models.FileField(upload_to=processed_video_path, null=True, blank=True) #path to the master playlist (master.m3u8 whick links all resolutions)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class VideoResolution(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    resolution = models.CharField(max_length=10)
    chunk_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.video.id} - {self.resolution}"