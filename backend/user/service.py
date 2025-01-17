from django.http import HttpRequest, JsonResponse
from authentication.models import User
from authentication.service import get_user_by_id
from image.service import upload_image

def update_pfp(request: HttpRequest) -> JsonResponse:
    user: User = get_user_by_id(request.user.id)
    image = request.FILES.get("pfp")

    pfp = upload_image(image, "pfp")
    user.profile_picture = pfp
    user.save()

    return JsonResponse({"message": "Profile picture updated"}, status=200)