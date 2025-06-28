from django.urls import path
from . import views

urlpatterns = [
    path('register', views.AuthenticationViewSet.as_view({'post': 'register'}), name="register"),
    path('login', views.AuthenticationViewSet.as_view({'post': 'login'}), name="login"),
    path('logout', views.AuthenticatedAuthViewSet.as_view({'post': 'logout'}), name="logout"),
    path('session', views.AuthenticatedAuthViewSet.as_view({'get': 'session'}), name="session"),
    path('refresh', views.refresh, name="refresh"),
    path('forgot-password', views.AuthenticationViewSet.as_view({'post': 'forgot_password'}), name='forgot-password'),
    path('reset-password', views.AuthenticationViewSet.as_view({'post': 'reset_password'}), name='reset-password'),
    path('username_available', views.username_available, name='username_available')
]