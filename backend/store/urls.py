from django.urls import path
from . import views

urlpatterns = [
    path('create', views.StoreViewSet.as_view({'post': 'create_store'}), name='create_store'),
    path('create/product', views.StoreViewSet.as_view({'post': 'create_product'}), name='create_product')
]