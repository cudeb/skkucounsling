from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Counseling, CounselingApplication, CounselingJournals, CounselingPrefertimeslot, CounselingSchedule, CounselingTestSchedule
from common.models import User, Student, Counselor
from .serializers import CounselingApplicationSerializer, CounselingScheduleSerializer, CounselingJournalsSerializer, CounselingSerializer
# Create your views here.


class CounselingInfoStudent(APIView):
    # 학생의 전체 상담정보
    def get(self, request, *args, **kwargs):
        user = request.user
        print(user)
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'student':
            res['error'] = "학생이 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        student = Student.objects.get(user=user)
        counseling = Counseling.objects.filter(student=student)
        res['counseling'] = CounselingSerializer(counseling, many=True).data
        return Response(res, status=status.HTTP_200_OK)
        
            
class CounselingScheduleStudent(APIView):
    # 학생의 상담스케줄
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'student':
            res['error'] = "학생이 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        
        student = Student.objects.get(user=user)
        counseling_schedule = CounselingSchedule.objects.filter(counseling__student=student)
        res['counseling_schedule'] = CounselingScheduleSerializer(counseling_schedule, many=True).data
        return Response(res, status=status.HTTP_200_OK)

    
class CounselingJournalStudent(APIView):
    # 힉생의 특정 상담 스케줄에 대한 상담기록
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'student':
            res['error'] = "학생이 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        schedule_id = request.GET.get('schedule_id')
        
        counseling_journals = CounselingJournals.objects.filter(counseling_schedule=schedule_id)
        res['counseling_journals'] = CounselingScheduleSerializer(counseling_journals, many=True).data
        return Response(res, status=status.HTTP_200_OK)
    
    
    
    
    
class CounselingApply(APIView):
    # 학생의 상담신청
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'student':
            res['error'] = "학생이 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        student = Student.objects.get(user=user)
        
        application = request.FILES.get('application')
        applied_at = request.data.get('applied_at')
        counseling_type = request.data.get('counseling_type')
        counseling_field = request.data.get('counseling_field')
        prefer_timeslots =  request.data.get('prefer_timeslots')
        
        ########################################
        ## 신청서 객체 생성 
        
        counseling_application = \
            CounselingApplication(
                student=student,
                application=application,
                applied_at=applied_at,
                counseling_type=counseling_type,
                counseling_field=counseling_field
            )
        
        counseling_application.save()
        
        for timeslot in prefer_timeslots:
            counseling_prefer_timeslot = \
                    CounselingPrefertimeslot(
                    counseling_application=counseling_application,
                    timeslot=timeslot
                )
            counseling_prefer_timeslot.save()
        
        ########################################
            
        ########################################
        ## 상담사 배정    
            
        ## counselor = ????
        ########################################
        
        ########################################
        ## 상담 생성
        ## Counseling 객체 생성
            
        ########################################
        
            
        ########################################
        ## 심리검사 날짜, 타임슬롯 배정
        ## CounselingTestSchedule 객체 생성
            
        ########################################
        
        ########################################
        ## 상담스케줄 날짜, 타임슬롯 배정
        ## CounselingSchedule 객체 N 개 생성
  
        ########################################
        
        
        return Response(status=status.HTTP_200_OK)
    
    
    
    
    
class CounselingInfoCounselor(APIView):
    # 상담사의 전체 상담정보 + 각 상담에 대한 상담신청정보
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        counselor = Counselor.objects.get(user=user)
        counseling = Counseling.objects.filter(counselor=counselor)
        res['counseling'] = CounselingSerializer(counseling, many=True).data
        
        return Response(res, status=status.HTTP_200_OK)

    
class CounselingScheduleCounselor(APIView):
    # 상담사의 전체 상담일정
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        counselor = Counselor.objects.get(user=user)
        counseling_schedule = CounselingSchedule.objects.filter(counseling__counselor=counselor)
        res['counseling_schedule'] = CounselingScheduleSerializer(counseling_schedule, many=True).data
        return Response(res, status=status.HTTP_200_OK)
        
    
class CounselingJournalCounselor(APIView):
    # 상담사의 특정 스케줄에 대한 상담기록
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        schedule_id = request.GET.get('schedule_id')
        
        counseling_journals = CounselingJournals.objects.filter(counseling_schedule=schedule_id)
        res['counseling_journals'] = CounselingScheduleSerializer(counseling_journals, many=True).data
        
        return Response(res, status=status.HTTP_200_OK)
    
class CounselingFeedback(APIView):
    # 특정 상담 스케줄에 대한 피드백 하기
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        
        schedule_id = request.GET.get('schedule_id')

        counseling_journals = CounselingJournals.objects.get(counseling_schedule=schedule_id)

        feedback = request.data.get('feedback')

        counseling_journals.feedback = feedback
        counseling_journals.save()
        return Response(res, status=status.HTTP_200_OK)