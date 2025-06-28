from django.urls import path

from explore.views import ExploreViewSet


urlpatterns = [
    path('all/', ExploreViewSet.as_view({'get': 'all'}), name='all_posts'),
    path('feed/', ExploreViewSet.as_view({'get': 'feed'}), name='feed'),
]