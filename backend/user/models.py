from datetime import timedelta
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

from image.models import Image

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, username, email, full_name, date_of_birth, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, full_name=full_name, date_of_birth=date_of_birth, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, full_name, date_of_birth, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, full_name, date_of_birth, password, **extra_fields)

class User(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=254, unique=True)

    profile_picture = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)

    password_reset_token = models.CharField(max_length=128, null=True, blank=True)
    password_reset_token_created_at = models.DateTimeField(null=True, blank=True)
    password_updated_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "date_of_birth", "password"]

    objects = UserManager()

    def __str__(self) -> str:
        return f"{self.full_name}: {self.get_username()}"
    
    def has_email_verified(self) -> bool:
        return self.email_verified_at is not None

    def has_phone_verified(self) -> bool:
        return self.phone_verified_at is not None
    
    def get_email_verification_code(self) -> str:
        return VerificationData.objects.get(user=self, field="email").code

    def pfp_url(self) -> str:
        if self.profile_picture is None:
            return "https://cdn.pfps.gg/pfps/2301-default-2.png"
        return self.profile_picture.image_url
        

    def set_password_reset_token(self, token: str) -> None: #hashed token
        self.password_reset_token = token
        self.password_reset_token_created_at = timezone.now()
        self.save()

    def reset_password(self, new_password: str) -> None:
        self.set_password(new_password)
        self.password_reset_token = None
        self.password_reset_token_created_at = None
        self.password_updated_at = timezone.now()
        self.save()

class VerificationData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    field = models.CharField(choices=[("email", "email"), ("phone", "phone")], max_length=5)
    code = models.CharField(max_length=128) # hashed code
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.user.username} for {self.field}: {self.code}"
    
    def can_request_new_code(self) -> bool:
        return self.created_at + timedelta(seconds=45) < timezone.now()
    
    def is_code_expired(self) -> bool:
        return self.created_at + timedelta(minutes=5) < timezone.now()
