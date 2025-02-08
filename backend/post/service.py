from post.exceptions import PostNotFound
from post.models import Comment, Like, Post
from post.serializers import CreatePostSerializer
from user.models import User
from django.core.files.uploadedfile import UploadedFile

def create_post(user: User, json_data: dict, video: UploadedFile) -> Post:    
    serializer = CreatePostSerializer(data={**json_data, "creator": user.id, "video_file": video})
    serializer.is_valid(raise_exception=True)
    return serializer.save()

def like_post(user: User, post_id: int) -> str:
    post: Post = Post.objects.filter(id=post_id).first()

    if not post:
        raise PostNotFound()
    
    like, created = Like.objects.get_or_create(user=user, post=post)
    
    if not created:
        like.delete()
        post.likes -= 1
        post.save()
        return "Deleted"
    
    post.likes += 1
    post.save()
    return "Liked"

def comment_on_post(user: User, comment: str, post_id: int) -> Comment:
    post = Post.objects.filter(id=post_id).first()

    if not post:
        raise PostNotFound()
    
    comment = Comment.objects.create(creator=user, post=post, comment=comment)
    post.comment_count += 1
    post.save()

    return True

def delete_comment(user: User, post_id: int, comment_id: int) -> bool:
    comment = Comment.objects.filter(id=comment_id, creator=user, post_id=post_id).first()

    if not comment:
        return False
    
    comment.delete()
    post = Post.objects.filter(id=post_id).first()
    post.comment_count -= 1
    post.save()

    return True

def get_post_comments(post_id: int) -> list:
    post = Post.objects.filter(id=post_id).first()

    if not post:
        raise PostNotFound()
    
    comments = Comment.objects.filter(post=post)
    return comments