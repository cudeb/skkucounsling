from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models 



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # 추가 필드를 토큰에 포함시키려면 여기에 추가하세요.
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = (
            "id",
            "user_type",
            "username",
            "realname",
            "student_number",
            "phone_number",
            "birth"
        )
        
    
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Student
        fields = (
            "id",
            "user"
        )
        
class CounselorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = models.Counselor
        fields = (
            "id",
            "user"
        )