from django.urls import path

from explore.views import ExploreViewSet


urlpatterns = [
    path('feed/', ExploreViewSet.as_view({'get': 'feed'}), name='feed'),
]