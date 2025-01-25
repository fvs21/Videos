from django.db import models

from user.models import User

# Create your models here.
class Friendship(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=[("pending", "pending"), ("accepted", "accepted")], max_length=10)

    def __str__(self) -> str:
        if self.status == "pending":
            return f"{self.follower.username} requested to follow {self.followed.username}"
        return f"{self.follower.username} and {self.followed.username} are friends"
    
    def accept_friendship(self) -> None:
        self.status = "accepted"
        self.save()

    def reject_request(self) -> None:
        self.delete()