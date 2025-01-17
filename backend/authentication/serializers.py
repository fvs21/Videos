from rest_framework import serializers
from user.models import User
from django.contrib.auth.password_validation import validate_password

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'full_name',
            'email',
            'password',
            'date_of_birth'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, value):
        validate_password(value)
        return value
    
    def create(self, validated_data) -> User:
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user
