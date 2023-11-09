from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.contrib.auth import authenticate, login, logout

# from django.contrib.auth.models import User

from common.models import User


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
        else:
            res = {'error': 'Invalid credentials'}
                    
        # Response
        if user is not None:
            return Response(res, status=status.HTTP_200_OK)
        else:
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        

    
    
    
class RegisterAPIView(APIView):
    '''
    회원가입을 위한 뷰
    '''
    def post(self, request, format=None):
        
        username = request.data.get('username')
        password = request.data.get('password')
        user_type = request.data.get('user_type')
        email = request.data.get('email')

        # Validation
        if not (username and password and email):
            return Response({'error': '모든 필드는 필수입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        if user_type not in ['student', 'counselor']:
            return Response({'error': '잘못된 유저타입 입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # Transaction
        try:
            user = User.objects.create_user(username=username, password=password)
            #UserProfile.objects.create(user=user, email=email, user_type=user_type)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # 성공적인 응답
        return Response({'message': '회원가입이 완료되었습니다.'}, status=status.HTTP_201_CREATED)