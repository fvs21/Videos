from django.urls import path, include
from . import views

urlpatterns = [
    path('register', views.AuthenticationViewSet.as_view({'post': 'register'}), name="register"),
    path('login', views.AuthenticationViewSet.as_view({'post': 'login'}), name="login"),
    path('logout', views.AuthenticatedAuthViewSet.as_view({'post': 'logout'}), name="logout"),
    path('session', views.AuthenticatedAuthViewSet.as_view({'get': 'session'}), name="session"),
    path('refresh', views.refresh, name="refresh"),
    path('verify-email', views.AuthenticatedAuthViewSet.as_view({'post': 'verify_email'}), name="verify-email"),
    path('email/code', views.AuthenticatedAuthViewSet.as_view({'post': 'request_email_verification_code'}), name="request-email-verification-code"),
    path('forgot-password', views.AuthenticationViewSet.as_view({'post': 'forgot_password'}), name='forgot-password'),
    path('reset-password', views.AuthenticationViewSet.as_view({'post': 'reset_password'}), name='reset-password')
]