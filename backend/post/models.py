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
    description = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.BigIntegerField(default=0)
    #url = models.URLField(name="post_url")
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField(max_length=80)
    likes = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
