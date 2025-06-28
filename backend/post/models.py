import uuid
from django.db import models

from user.models import User

from django.utils.deconstruct import deconstructible
import os

from video.models import Video

@deconstructible
class PathName(object):
    def __init__(self):
        self.path = "videos/raw"

    def __call__(self, instance, filename):
        extension = os.path.splitext(filename)[1]
        return os.path.join(self.path, uuid.uuid4() + extension)

# Create your models here.
class Post(models.Model):
    description = models.CharField(max_length=250, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.BigIntegerField(default=0)
    comment_count = models.BigIntegerField(default=0)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    views = models.BigIntegerField(default=0)

    def trending_score(self) -> float:
        '''
        basic implementation of trending score for recomending posts to users
        '''
        return (self.likes * 2) + (self.comment_count * 1.5) + self.views
    
    def get_video_url(self) -> str:
        '''
        Returns the URL of the video associated with the post
        '''
        return "http://localhost:8000/api/video/playlist/" + self.video.id

class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField(max_length=80)
    likes = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class View(models.Model):
    viewer = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    times_watched = models.BigIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
