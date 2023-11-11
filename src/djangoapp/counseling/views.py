from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Counseling, CounselingApplication, CounselingJournals, CounselingPrefertimeslot, CounselingSchedule, CounselingTestSchedule
from common.models import User, Student, Counselor
from .serializers import CounselingApplicationSerializer, CounselingScheduleSerializer, CounselingJournalsSerializer, CounselingSerializer
import datetime
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
        
        #신청서 객체 생성
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

        #상담 객체 생성
        counseling = \
            Counseling(counseling_application=counseling_application,counselor=None,student=student)
        counseling.save()

        #심리검사 객체 생성
        date = request.data.get('date')
        timeslot = request.data.get('timeslot')
        counseling_test_schedule = \
            CounselingTestSchedule(counseling=counseling,date = date,
                                   timeslot = timeslot)
        counseling_test_schedule.save()

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
    
    
class CounselingApplications(APIView):
    # 승인되지 않은 상담 신청서 전체 반환
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        counseling_application = CounselingApplication.objects.filter(approved=False)
        res['counseling_application'] = CounselingApplicationSerializer(counseling_application,many=True).data
        Response(res,status=status.HTTP_200_OK)
        
        
class CounselingApplicationFormalApproval(APIView):
    #상담 신청서 승인을 위해 상담사 상담 스케줄 반환 + 상담사에게 자동으로 상담 요일 추천
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        #학생의 상담 선호 시간과 상담사의 상담 스케줄 불러오기
        student_number = request.data.get('student_number')
        user_student = User.objects.get(student_number=student_number)
        student = Student.objects.get(user=user_student)
        counseling_application = CounselingApplication.objects.get(student=student)
        counseling_prefertimeslots = CounselingPrefertimeslot.objects.filter(counseling_application=counseling_application)

        counselor = Counselor.objects.get(user=user)
        counseling_schedules = CounselingSchedule.objects.filter(counseling__counselor=counselor)
        res['counseling_schedule'] = CounselingScheduleSerializer(counseling_schedules,many=True).data
        
        #학생의 선호 상담 시간을 바탕으로 자동으로 상담 날짜 추천
        date_dict = {0:'MON',1:'TUE',2:'WED',3:'THU',4:'FRI',5:'SAT',6:'SUN'}
        for prefertimeslot in counseling_prefertimeslots: #학생이 선호하는 timeslot 마다
            day,time = prefertimeslot.timeslot[:3],prefertimeslot[3:]   #day(요일)와 time(시간) 분리
            date = datetime.datetime.today() + datetime.timedelta(days=1) #현재 날짜 다음날부터 day(선호 요일)과 일치하는 요일인 날짜 선택
            for i in range(7):
                if date_dict[date.weekday()] == day:
                    break
                else:
                    date += datetime.timedelta(days=1)
            for i in range(5): # 해당 날짜에 상담사의 상담 일정이 없으면 추천, 있으면 다음 주도 확인, 한달(5주) 안에 해당 날짜 없으면 추천 포기
                for counseling_schedule in counseling_schedules:
                    if counseling_schedule.date.date() != date.date():
                        if counseling_schedule.timeslot[3:] != time:
                            res['auto_recommend'] = {'date':date.date(),'time':time}
                            return Response(res,status=status.HTTP_200_OK)
                date += datetime.timedelta(days=7)
        res['auto_recommend'] = 'None'
        return Response(res,status=status.HTTP_200_OK)


class CounselingApplicationApproval(APIView):
    #상담서 신청 승인
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        #학번을 통해 상담 객체 불러오기
        student_number = request.data.get('student_number')
        user_student = User.objects.get(student_number=student_number)
        student = Student.objects.get(user=user_student)
        counseling = Counseling.objects.get(student=student)

        #상담 객체에 상담사 배정해주기
        counseling.counselor = Counselor.objects.get(user=user)
        counseling.save()

        #신청서 승인 상태로 바꾸기
        counseling_application = CounselingApplication.objects.get(student=student)
        counseling_application.approved = True
        counseling_application.save()
        
        #상담사가 선택한 상담 날짜와 시간 받아오기
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')

        #상담 스케줄 객체 만들기 (첫 신청일때는 1개의 스케줄 생성.. 첫 상담 후에 추가/업데이트..)
        counseling_schedule = \
            CounselingSchedule(counseling=counseling,session_date=session_date,
                               session_timeslot=session_timeslot,session_number=1,
                               session_status='Yet')
        counseling_schedule.save()

        return Response(status=status.HTTP_200_OK)


class CounselingApplicationDenial(APIView):
    #상담서 신청 거부
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        #상담 객체 삭제
        student_number = request.data.get('student_number')
        user_student = User.objects.get(student_number=student_number)
        student = Student.objects.get(user=user_student)
        counseling = Counseling.objects.get(student=student)
        counseling.delete()

        return Response(status=status.HTTP_200_OK)


class CounselingScheduleAdd(APIView):
    #상담 스케줄 추가
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        #상담 스케줄 객체 만들기
        student_number = request.data.get('student_number')
        user_student = User.objects.get(student_number=student_number)
        student = Student.objects.get(user=user_student)
        counseling = Counseling.objects.get(student=student)
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')
        session_number = request.data.get('session_number')
        
        counseling_schedule = \
            CounselingSchedule(counseling=counseling, session_date=session_date,
                               session_timeslot=session_timeslot, session_number=session_number,
                               session_status='Yet')
        counseling_schedule.save()

        return Response(status=status.HTTP_200_OK)
    
    
class CounselingScheduleUpdate(APIView):
    #상담 스케줄 업데이트
    def post(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
            res['error'] = "상담사가 아닙니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)

        # 상담 스케줄 객체 업데이트
        student_number = request.data.get('student_number')
        user_student = User.objects.get(student_number=student_number)
        student = Student.objects.get(user=user_student)
        counseling = Counseling.objects.get(student=student)
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')
        session_number = request.data.get('session_number')
        session_status = request.data.get('session_status')

        counseling_schedule = CounselingSchedule.objects.get(counseling=counseling,session_number=session_number)
        counseling_schedule.session_date = session_date
        counseling_schedule.timeslot = session_timeslot
        counseling_schedule.session_status = session_status
        counseling_schedule.save()

        return Response(status=status.HTTP_200_OK)