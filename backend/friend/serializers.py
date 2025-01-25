from rest_framework import serializers

from friend.exceptions import FriendshipRequestException
from friend.models import Friendship

class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ["follower", "followed"]

    def create(self, validated_data: dict) -> Friendship:
        '''
        if user.profile.is_private:
            return Friendship.objects.create(**validated_data, status="pending")
        '''
        return Friendship.objects.create(**validated_data, status="accepted")
    
    def validate(self, attrs: dict) -> dict:
        follower = attrs["follower"]
        followed = attrs["followed"]

        if follower == followed:
            raise FriendshipRequestException("You cannot follow yourself", 400)

        friendship = Friendship.objects.filter(follower=follower, followed=followed).first()
        if friendship is not None:
            if friendship.status == "pending":
                raise FriendshipRequestException("You already requested to follow this user", 409)
            
            raise FriendshipRequestException("You are already following this user", 409)
        
        return attrs
