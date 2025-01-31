from django.db import models

from image.models import Image
from user.models import User

# Create your models here.
class Store(models.Model):
    name = models.CharField(max_length=100)
    store_picture = models.ForeignKey(Image, on_delete=models.CASCADE)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def store_picture_url(self):
        if not self.store_picture:
            return None
        return self.store_picture.image_url
    
    @property
    def products(self):
        return Product.objects.filter(store=self)

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

    def save(self, *args, **kwargs):
        if Product.objects.filter(images=self.images).exists():
            raise Exception('Image already used')
        return super(Product, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.name} - {self.store.name}"