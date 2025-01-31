from django.http import HttpRequest
from typing import Optional
from user.exceptions import UnableToUpdateUser
from user.models import User
from authentication.service import get_user_by_id
from image.service import upload_image
from user.validators import UserValidator

def update_pfp(request: HttpRequest) -> User:
    user: User = get_user_by_id(request.user.id)
    image = request.FILES.get("pfp")

    pfp = upload_image(image, "pfp")

    if pfp is None:
        raise UnableToUpdateUser("pfp")
    
    user.profile_picture = pfp
    return user.save()

def update_username(request: HttpRequest) -> Optional[User]:
    user: User = get_user_by_id(request.user.id)

    username = request.POST.get('username')

    if User.objects.exists(username = username):
        return None
    
    if not UserValidator.validate_username(username):
        raise UnableToUpdateUser("username")

    user.username = username
    return user.save()