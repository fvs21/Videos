from rest_framework import serializers
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
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
            'pfp_url'
        ]