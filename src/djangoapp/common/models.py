from django.db import models
# from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_type = models.CharField(max_length=20, choices=[('student', 'Student'), ('counselor', 'Counselor')])
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=False)

    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=[('student', 'Student'), ('counselor', 'Counselor')])
    email = models.EmailField(unique=True)
