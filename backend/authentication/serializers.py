from rest_framework import serializers
from authentication.exceptions import RegistrationException, ResetPasswordException, UserDoesNotExistException
from authentication.utils import AuthenticationUtils
from user.models import User
from django.contrib.auth.password_validation import validate_password as check_valid_password

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
        check_valid_password(value)
        return value
    
    def create(self, validated_data) -> User:
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user
    
class ResetPasswordSerializer(serializers.Serializer):
    credential = serializers.CharField(required=True, error_messages={'required': 'Credential missing'})
    password_reset_token = serializers.CharField(max_length=128)
    new_password = serializers.CharField(max_length = 20)
    confirm_password = serializers.CharField(max_length = 20)

    def validate_credential(self, value):
        if AuthenticationUtils.determine_credential_type(value) == "username":
            raise UserDoesNotExistException()
        return value

    def validate_new_password(self, value):
        if not 8 <= len(value) <= 20:
            raise ResetPasswordException('You must choose a more secure password')
        return value
    
    def validate_confirm_password(self, value):
        if value != self.new_password:
            raise ResetPasswordException('Password don\' match')
        return value