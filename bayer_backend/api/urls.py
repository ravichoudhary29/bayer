
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicInfoViewSet,LoginAPIView

router = DefaultRouter()
router.register(r'publicInfo', PublicInfoViewSet, basename='publicInfo' )
# router.register(r'login', LoginAPIView, basename='login')





urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginAPIView.as_view(), name='login'), 
]