from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.contrib.auth import authenticate, login, logout

# from django.contrib.auth.models import User

from common.models import User, Student, Counselor


class LoginAPIView(APIView):
    '''
    ID와 PW를 받아서 JWT을 반환하는 view.
    '''
    def post(self, request, *args, **kwargs):
        
        password = request.data.get('password')
        email = request.data.get('email')
        # Validation
        
        # Transaction
        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            res = {
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user_type' : user.user_type
                }
            if user.user_type == 'student':
                try:
                    student = Student.objects.get(user=user)
                except Student.DoesNotExist:
                    student = Student(user=user)
                    student.save()
                    
            elif user.user_type == 'counselor':
                try:
                    counselor = Counselor.objects.get(user=user)
                except Counselor.DoesNotExist:
                    counselor = Counselor(user=user)
                    counselor.save()
        else:
             res = {'error': 'Invalid credentials'}
                    

                    
        # Response
        if user is not None:
            return Response(res, status=status.HTTP_200_OK)
        else:
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
