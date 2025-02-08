from django.urls import path
from . import views

urlpatterns = [
    path('create', views.AuthenticatedStoreViewSet.as_view({'post': 'create_store'}), name='create_store'),
    path('create/product', views.AuthenticatedStoreViewSet.as_view({'post': 'create_product'}), name='create_product'),
    path('get', views.AuthenticatedStoreViewSet.as_view({'get': 'get_user_store'}), name='get_user_store'),
    path('edit/name', views.AuthenticatedStoreViewSet.as_view({'patch': 'edit_store_name'}), name='edit_store_name'),
    path('edit/picture', views.AuthenticatedStoreViewSet.as_view({'patch': 'edit_store_picture'}), name='edit_store_picture'),
    path('get/<int:store_id>', views.StoreViewSet.as_view({'get': 'get_store_by_id'}), name='get_store_by_id'),
    path('product/<int:product_id>', views.StoreViewSet.as_view({'get': 'view_product'}), name='view_product'),
]