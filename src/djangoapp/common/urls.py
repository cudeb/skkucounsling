from django.urls import path
from common import views
from django.contrib.auth import views as auth_views

app_name = 'common'

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    
]