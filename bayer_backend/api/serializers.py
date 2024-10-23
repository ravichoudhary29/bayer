
from rest_framework import serializers
from .models import PublicInfo

class HealthInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicInfo
        fields = '__all__'

        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)