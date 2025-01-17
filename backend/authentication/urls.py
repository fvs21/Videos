from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('register', views.AuthenticationViewSet.as_view({'post': 'register'}), name="register"),
    path('login', views.AuthenticationViewSet.as_view({'post': 'login'}), name="login"),
    path('logout', views.AuthenticationViewSet.as_view({'post': 'logout'}), name="logout"),
    path('session', views.AuthenticatedAuthViewSet.as_view({'get': 'session'}), name="session"),
    path('refresh', views.AuthenticationViewSet.as_view({'post': 'refresh'}), name="refresh"),
    
]