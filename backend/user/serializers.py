from rest_framework import serializers
from user.models import User
from store.models import Store

class UserSerializer(serializers.ModelSerializer):
    is_seller = serializers.SerializerMethodField()

    def get_is_seller(self, obj):
        return Store.objects.filter(owner=obj).exists()

    class Meta:
        model = User
        fields = [
            'username',
            'full_name',
            'email',
            'country_code',
            'phone',
            'date_of_birth',
            'has_email_verified',
            'has_phone_verified',
            'pfp_url',
            'is_seller',
        ]