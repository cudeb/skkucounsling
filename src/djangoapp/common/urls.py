from django.urls import path
from common import views
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView



app_name = 'common'

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh')
    # path('register/', views.RegisterAPIView.as_view(), name='register'),   
]