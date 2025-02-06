from django.urls import path
from . import views

urlpatterns = [
    path('create', views.AuthenticatedStoreViewSet.as_view({'post': 'create_store'}), name='create_store'),
    path('create/product', views.AuthenticatedStoreViewSet.as_view({'post': 'create_product'}), name='create_product'),
    path('get', views.AuthenticatedStoreViewSet.as_view({'get': 'get_user_store'}), name='get_user_store'),
]