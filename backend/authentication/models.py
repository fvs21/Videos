from django.db import models
from datetime import timedelta, timezone
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(max_length=254, unique=True)
    full_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()

    country_code = models.IntegerField()
    phone = models.CharField(max_length=15, unique=True)

    email_verified_at = models.DateTimeField(null=True, blank=True)
    phone_verified_at = models.DateTimeField(null=True, blank=True)

    REQUIRED_FIELDS = ["email", "first_name", "last_name", "date_of_birth"]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}: {self.get_username()}"
    
    def has_email_verified(self) -> bool:
        return self.email_verified_at is not None

    def has_phone_verified(self) -> bool:
        return self.phone_verified_at is not None
    
    def get_email_verification_code(self) -> str:
        return VerificationData.objects.get(user=self, field="email").code
    
class VerificationData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    field = models.CharField(choices=[("email", "email"), ("phone", "phone")], max_length=5)
    code = models.CharField(max_length=128) # hashed code
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user.username}: {self.code}"
    
    def can_request_new_code(self) -> bool:
        return self.created_at + timedelta(minutes=5) < timezone.now()