from django.http import HttpRequest, JsonResponse

from friend.serializers import FriendshipRequestSerializer


def request_to_follow(data: dict) -> JsonResponse:
    '''
    method to send a follow request to a user
    and send a notification to the receiver user
    '''

    serialized = FriendshipRequestSerializer(data=data)
    serialized.is_valid(raise_exception=True)
    serialized.save()

    #send notification to the user

    return JsonResponse({"message": "Friendship request sent"}, status=201)

