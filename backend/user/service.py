from django.http import HttpRequest, JsonResponse
from user.exceptions import FieldAlreadyInUse
from user.models import User
from authentication.service import get_user_by_id
from image.service import upload_image
from user.serializers import UserSerializer

def update_pfp(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)
    image = request.FILES.get("pfp")

    pfp = upload_image(image, "pfp")
    user.profile_picture = pfp
    user.save()

    return JsonResponse(UserSerializer(user).data, status=200)

def update_username(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)

    username = request.POST.get('username')
    if User.objects.exists(username = username):
        raise FieldAlreadyInUse("username")
    
    user.username = username
    user.save()

    return JsonResponse(UserSerializer(user).data, status=200)