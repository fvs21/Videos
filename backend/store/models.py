from unicodedata import category
from django.db import models

from image.models import Image
from user.models import User

# Create your models here.
class Store(models.Model):
    name = models.CharField(max_length=23)
    store_picture = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def store_picture_url(self) -> str:
        if not self.store_picture:
            return None
        return self.store_picture.image_url
    
    def products(self):
        return Product.objects.filter(store=self)
    
    def set_store_picture(self, image: Image):
        current = self.store_picture

        if not current is None:
            current.delete()

        self.store_picture = image
        self.save()

    def __str__(self) -> str:
        return f"{self.name} - {self.owner.username}"
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    images = models.ManyToManyField(Image)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey('Category')
    
    def images_urls(self) -> list:
        return [
            f"http://192.168.68.103:8000{image.image_url}" for image in self.images.all()
        ]

    def __str__(self) -> str:
        return f"{self.name} - {self.store.name}"

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('Electronics', 'Electronics'),
        ('Fashion & Accesories', 'Fashion & Accesories'),
        ('Home', 'Home'),
        ('Toys', 'Toys'),
        ('Beauty & Health', 'Beauty & Health'),
        ('Sports', 'Sports'),
    ]
    
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)