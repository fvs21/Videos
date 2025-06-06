from django.urls import path
from . import views

urlpatterns = [
    path('register', views.AuthenticationViewSet.as_view({'post': 'register'}), name="register"),
    path('login', views.AuthenticationViewSet.as_view({'post': 'login'}), name="login"),
    path('logout', views.AuthenticatedAuthViewSet.as_view({'post': 'logout'}), name="logout"),
    path('mobile/logout', views.AuthenticatedAuthViewSet.as_view({'post': 'mobile_logout'}), name="mobile-logout"),
    path('session', views.AuthenticatedAuthViewSet.as_view({'get': 'session'}), name="session"),
    path('refresh', views.refresh, name="refresh"),
    path('mobile/refresh', views.mobile_refresh, name="mobile-refresh"),
    path('verify-email', views.AuthenticatedAuthViewSet.as_view({'post': 'verify_email'}), name="verify-email"),
    path('email/code', views.AuthenticatedAuthViewSet.as_view({'post': 'request_email_verification_code'}), name="request-email-verification-code"),
    path('forgot-password', views.AuthenticationViewSet.as_view({'post': 'forgot_password'}), name='forgot-password'),
    path('reset-password', views.AuthenticationViewSet.as_view({'post': 'reset_password'}), name='reset-password'),
    path('username_available', views.username_available, name='username_available')
]