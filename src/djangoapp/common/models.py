from django.db import models
# from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    id = models.IntegerField(primary_key=True)
    user_type = models.CharField(max_length=20)
    email = models.EmailField(unique=True) # 상담사는 임의 이메일 부여하여 생성
    username = models.CharField(max_length=20, unique=False) # 실제 이름 ex) 정승혁
    student_number =  models.CharField(max_length=20) # 학번, 상담사는 상담사 번호 부여
    phone_number = models.CharField(max_length=20) # 연락처
    birth = models.CharField(max_length=20) # 생년월일

class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE) # FK
    
class Counselor(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE) # FK
