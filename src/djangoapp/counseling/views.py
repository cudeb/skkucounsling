from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
from .models import Counseling, CounselingApplication, CounselingJournals, CounselingPrefertimeslot, CounselingSchedule, CounselingTestSchedule, CounselingPreferfield
from common.models import User, Student, Counselor
from common.serializers import StudentSerializer
from .serializers import CounselingApplicationSerializer, CounselingScheduleSerializer, CounselingJournalsSerializer, CounselingSerializer, CounselingPreferfieldSerializer, CounselingPrefertimeslotSerializer
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        student = Student.objects.get(user=user)
        counseling = Counseling.objects.filter(student=student)
        res['counseling'] = CounselingSerializer(counseling, many=True).data
        return Response(res, status=status.HTTP_200_OK)
        
class CounselingApplicationStudent(APIView):
    # 학생이 신청한 상담 신청서
    def get(self, request, *args, **kwargs):
        user = request.user
        print(user)
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'student':
            res['error'] = "학생이 아닙니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        student = Student.objects.get(user=user)
        counseling_applications = CounselingApplication.objects.filter(student=student).values('id', 'student', 'application_file', 'applied_at', 'counseling_type', 'test_date', 'test_timeslot', 'approved', 'denied')
        for counseling_application in counseling_applications:
            counseling_prefertimeslots = CounselingPrefertimeslot.objects.filter(counseling_application=counseling_application['id'])
            counseling_application['counseling_prefertimeslots'] = CounselingPrefertimeslotSerializer(counseling_prefertimeslots, many=True).data
            counseling_preferfields = CounselingPreferfield.objects.filter(counseling_application=counseling_application['id'])
            counseling_application['counseling_preferfields'] = CounselingPreferfieldSerializer(counseling_preferfields, many=True).data
        
        res['counseling_applications'] = counseling_applications

        return Response(res,status=status.HTTP_200_OK)
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        student = Student.objects.get(user=user)
        counseling_type = CounselingApplication.objects.filter(student=student).values('counseling_type')
        test_schedule = CounselingApplication.objects.filter(student=student).values('test_date', 'test_timeslot')
        counseling_schedule = CounselingSchedule.objects.filter(counseling__student=student)
        res['counseling_schedule'] = CounselingScheduleSerializer(counseling_schedule, many=True).data
        res['counseling_type'] = counseling_type
        res['test_schedule'] = test_schedule
        res['start_schedule'] = CounselingScheduleSerializer(counseling_schedule.first()).data
        res['last_schedule'] = CounselingScheduleSerializer(counseling_schedule.last()).data
        # please count Yet, Done session
        current_time = datetime.datetime.now().date()
        done_count = 0
        absence_count = 0
        upcoming_count = 0

        for schedule in counseling_schedule:
            if schedule.session_status == 'Done':
                done_count += 1
            elif schedule.session_date < current_time and schedule.session_status == 'Yet':
                absence_count += 1
            else:
                upcoming_count += 1
        
        total_count = done_count + absence_count
        res['done_count'] = done_count
        res['absence_count'] = absence_count
        res['upcoming_count'] = upcoming_count
        res['attendence_rate'] = done_count / total_count * 100 if total_count else 1
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        schedule_id = request.GET.get('schedule_id')
        
        if schedule_id is None: # 요청에 schedule_id 유무 체크
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)        
        
        counseling_journals = CounselingJournals.objects.filter(counseling_schedule=schedule_id)
        res['counseling_journals'] = CounselingJournalsSerializer(counseling_journals, many=True).data
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        student = Student.objects.get(user=user)
        
        application_file = request.FILES.get('application')
        applied_at = request.data.get('applied_at')
        counseling_type = request.data.get('counseling_type')
        test_date = request.data.get('test_date')
        test_timeslot = request.data.get('test_timeslot')
        prefer_timeslots =  request.data.get('prefer_timeslots')
        prefer_fields = request.data.get('prefer_fields')
        
        # 요청에 필요한 데이터 유무 판단
        if application_file is None or applied_at is None \
        or counseling_type is None or test_date is None \
        or test_timeslot is None or prefer_timeslots is None \
        or prefer_fields is None:
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        # 신청서 객체 생성
        counseling_application = \
            CounselingApplication(
                student=student,
                application_file=application_file,
                applied_at=applied_at,
                counseling_type=counseling_type,
                test_date = test_date,
                test_timeslot = test_timeslot,
            )
        
        counseling_application.save()
        
        prefer_timeslots = prefer_timeslots.split(',')
        # 타임슬롯 지정
        for timeslot in prefer_timeslots:
            counseling_prefer_timeslot = \
                CounselingPrefertimeslot(
                    counseling_application=counseling_application,
                    timeslot=timeslot
                )
            counseling_prefer_timeslot.save()

        # 상담분야 지정
        prefer_fields = prefer_fields.split(',')
        for field in prefer_fields:
            counseling_prefer_field = \
                CounselingPreferfield(
                    counseling_application=counseling_application,
                    field=field
                )
            counseling_prefer_field.save()


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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        schedule_id = request.GET.get('schedule_id')
        
        if schedule_id is None: # 요청에 schedule_id 유무 체크
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        counseling_schedule = CounselingSchedule.objects.get(id=schedule_id)
        counseling_journals = CounselingJournals.objects.get(counseling_schedule=counseling_schedule)
        res['counseling_journals'] = CounselingJournalsSerializer(counseling_journals).data
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        schedule_id = request.data.get('schedule_id')

        if schedule_id is None: # 요청에 schedule_id 유무 체크 
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
            
        counseling_journals = CounselingJournals.objects.get(counseling_schedule=schedule_id)

        feedback = request.data.get('feedback')

        if feedback is None: # 요청에 feedback 유무 체크 
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
            
        counseling_journals.feedback = feedback
        counseling_journals.save()
        return Response(res, status=status.HTTP_200_OK)
    
    
class CounselingApplications(APIView):
    # 전체 상담 신청서 전체 반환
    def get(self, request, *args, **kwargs):
        user = request.user
        res = {}
        if not user.is_authenticated:
            res['error'] = "로그인이 필요합니다."
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        if user.user_type != 'counselor':
           res['error'] = "상담사가 아닙니다."
           return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
       
        counseling_applications = CounselingApplication.objects.filter(approved=False,denied=False).values('id', 'student', 'application_file', 'applied_at', 'counseling_type', 'test_date', 'test_timeslot', 'approved', 'denied')

        for counseling_application in counseling_applications:
            student = Student.objects.get(id=counseling_application['student'])
            counseling_application['student'] = StudentSerializer(student).data
            counseling_prefertimeslots = CounselingPrefertimeslot.objects.filter(counseling_application=counseling_application['id'])
            counseling_application['counseling_prefertimeslots'] = CounselingPrefertimeslotSerializer(counseling_prefertimeslots, many=True).data
            counseling_preferfields = CounselingPreferfield.objects.filter(counseling_application=counseling_application['id'])
            counseling_application['counseling_preferfields'] = CounselingPreferfieldSerializer(counseling_preferfields, many=True).data
        
        res['counseling_applications'] = counseling_applications
        
        return Response(res, status=status.HTTP_200_OK)
        
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)

        # 해당 신청서의 상담 선호 시간, 선호 분야 상담사의 상담 스케줄 불러오기
        application_id = request.GET.get('application_id')
        
        if application_id is None: # 요청에 application_id 유무 체크
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        counseling_application = CounselingApplication.objects.get(id=application_id)
        counseling_prefertimeslots = CounselingPrefertimeslot.objects.filter(counseling_application=counseling_application)
        counseling_preferfields = CounselingPreferfield.objects.filter(counseling_application=counseling_application)

        counselor = Counselor.objects.get(user=user)
        counseling_schedules = CounselingSchedule.objects.filter(counseling__counselor=counselor)
        res['counseling_schedule'] = CounselingScheduleSerializer(counseling_schedules,many=True).data
        
        #학생의 선호 상담 시간을 바탕으로 자동으로 상담 날짜 추천
        date_dict = {0:'MON',1:'TUE',2:'WED',3:'THU',4:'FRI',5:'SAT',6:'SUN'}
        date = datetime.datetime.today() + datetime.timedelta(days=1)
        for i in range(5): #한달(5주) 안에 해당 날짜 없으면 추천 포기
            date += datetime.timedelta(days=7*i)
            for prefertimeslot in counseling_prefertimeslots: #학생이 선호하는 timeslot 마다     
                temp_date = date           
                day,time = prefertimeslot.timeslot[:3],prefertimeslot.timeslot[3:]   #day(요일)와 time(시간) 분리
                 #date(현재 날짜 다음날)부터 day(선호 요일)과 일치하는 요일인 날짜 선택
                for i in range(7):
                    if date_dict[date.weekday()] == day:
                        break
                    else:
                        date += datetime.timedelta(days=1)
                # 해당 날짜/시간에 상담사의 상담 일정이 없으면 추천, 있으면 패스
                check = False 
                for counseling_schedule in counseling_schedules:
                    if counseling_schedule.session_date == date.date():
                        if counseling_schedule.session_timeslot[3:] == time:
                            check = True
                            break
                if(not check):
                    res['auto_recommend'] = {'date':date.date(),'time':time}
                    return Response(res,status=status.HTTP_200_OK)
                date = temp_date
        res['auto_recommend'] = 'None'
        
        return Response(res, status=status.HTTP_200_OK)


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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        # 요청에서 데이터 미리 받아오기
        application_id = request.data.get('application_id')
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')
        
        # 요청에서 데이터 유무 체크
        if application_id is None \
        or session_date is None or session_timeslot is None:
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        # 신청서 승인 상태로 바꾸기
        counseling_application = CounselingApplication.objects.get(id=application_id)
        all_counseling_applications = CounselingApplication.objects.filter(student = counseling_application.student)
        for application in all_counseling_applications:
            if application != counseling_application:
                application.denied = True
                application.save()
        counseling_application.approved = True
        counseling_application.save()
        
        #상담 객체 생성 + 승인한 상담사로 상담사 배정
        student = counseling_application.student
        counselor = Counselor.objects.get(user=user)
        counseling = \
            Counseling(
                counseling_application=counseling_application, 
                counselor=counselor, 
                student=student
            )
        counseling.save()

        # 심리검사 객체 생성
        test_date = counseling_application.test_date
        pre_test_timeslot = counseling_application.test_timeslot
        date_dict = {0:'MON',1:'TUE',2:'WED',3:'THU',4:'FRI',5:'SAT',6:'SUN'}
        timeslotDic = {'10':'1','11':'2','13':'3','14':'4','15':'5','16':'6'}
        test_timeslot = date_dict[test_date.weekday()] + timeslotDic[pre_test_timeslot]
        counseling_test_schedule = \
            CounselingTestSchedule(
                counseling=counseling,
                date=test_date,
                timeslot=test_timeslot
            )
            
        counseling_test_schedule.save()

        # 상담 스케줄 객체 만들기 (첫 신청일때는 1개의 스케줄 생성.. 첫 상담 후에 추가/업데이트..)
        counseling_schedule = \
             CounselingSchedule(
                 counseling=counseling,session_date=session_date,
                 session_timeslot=session_timeslot,
                 session_number=1,
                session_status='Yet'
             )
        counseling_schedule.save()

        counseling_journals = \
            CounselingJournals(
                counseling_schedule=counseling_schedule,
                feedback=""
            )
        counseling_journals.save()

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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        application_id = request.data.get('application_id')
        
        if application_id is None: # 요청에서 application_id 유무 체크
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)            
        
        counseling_application = CounselingApplication.objects.get(id=application_id)
        counseling_application.denied = True
        counseling_application.save()
        
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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)

        # 상담 스케줄 객체 만들기
        counseling_id = request.data.get('counseling_id')
        counseling = Counseling.objects.get(id=counseling_id)
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')
        session_number = request.data.get('session_number')
        
        # 요청에서 데이터 유무 체크
        if counseling_id is None or counseling is None or session_date is None \
        or session_timeslot is None or session_number is None:
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        counseling_schedule = \
            CounselingSchedule(
                counseling=counseling,
                session_date=session_date,
                session_timeslot=session_timeslot,
                session_number=session_number,
                session_status='Yet'
            )
        counseling_schedule.save()

        counseling_journals = \
            CounselingJournals(
                counseling_schedule=counseling_schedule,
                feedback=""
            )
        counseling_journals.save()

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
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)

        # 상담 스케줄 객체 업데이트
        schedule_id = request.data.get('schedule_id')
        session_date = request.data.get('session_date')
        session_timeslot = request.data.get('session_timeslot')
        session_number = request.data.get('session_number')
        session_status = request.data.get('session_status')

        # 요청에서 데이터 유무 체크
        if schedule_id is None or session_date is None or session_timeslot is None \
        or session_number is None or session_status is None:
            res['error'] = "잘못된 요청입니다."
            return Response(res, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        counseling_schedule = CounselingSchedule.objects.get(id=schedule_id)
        counseling_schedule.session_date = session_date
        counseling_schedule.session_timeslot = session_timeslot
        counseling_schedule.session_number = session_number
        counseling_schedule.session_status = session_status
        counseling_schedule.save()

        return Response(res, status=status.HTTP_200_OK)
    

class CounselingApplicationFile(APIView):
    def get(self, request, *args, **kwargs):
        application_id = request.GET.get('application_id')
        try:
            counseling_application = CounselingApplication.objects.get(id=application_id)
            
        except:
            return Response({"error" : "올바르지 않은 application_id 입니다."}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        application_file = counseling_application.application_file
        
        try:
            open(str(application_file))
        except:
            return Response({"error" : "파일이 존재하지 않습니다."}, status=status.HTTP_406_NOT_ACCEPTABLE)
            
        
        return FileResponse(open(str(application_file), 'rb'), status=status.HTTP_200_OK)