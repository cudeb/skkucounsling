from django.shortcuts import render
from rest_framework.views import APIView

# Create your views here.

class CounselingInfoStudent(APIView):
    # 학생의 전체 상담기록
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingScheduleStudent(APIView):
    # 학생의 상담신청
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingJournalStudent(APIView):
    # 힉생의 전체 상담기록
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingApply(APIView):
    # 학생의 상담신청
    def post(self, request, *args, **kwargs):
        pass
    
class CounselingInfoCounselor(APIView):
    # 상담사의 전체 상담정보
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingScheduleCounselor(APIView):
    # 상담사의 전체 상담일정
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingJournalCounselor(APIView):
    # 상담사의 전체 상담기록
    def get(self, request, *args, **kwargs):
        pass
    
class CounselingFeedback(APIView):
    # 피드백
    def post(self, request, *args, **kwargs):
        pass