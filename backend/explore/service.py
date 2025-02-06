from post.models import Like, View
from user.models import User
from django.db.models import Count

def get_personalized_feed(user: User):
    #get the posts the user has liked and viewed
    user_liked_posts = Like.objects.filter(creator=user).values_list('post', flat=True)
    user_viewed_posts = View.objects.filter(viewer=user).values_list('post', flat=True)

    #find users that have either watched or liked the same posts as the user
    similar_users = Like.objects.filter(post__in=user_liked_posts).union(
        View.objects.filter(post__in=user_viewed_posts).order_by('times_watched')
    ).exclude(user=user).values_list('user', flat=True)

    recommended_posts = Like.objects.filter(
        creator__in=similar_users
    ).values_list('post', flat=True).exclude(post__in=user_viewed_posts).annotate(score=Count('post')).order_by('-score')[:10]

    return recommended_posts