from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import PublicInfo
from .serializers import HealthInformationSerializer

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens  import RefreshToken
# from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class PublicInfoViewSet(viewsets.ModelViewSet):
    queryset = PublicInfo.objects.all()  # Queryset to retrieve all patients
    serializer_class = HealthInformationSerializer  # Serializer for converting model instances to JSON



class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this view

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)