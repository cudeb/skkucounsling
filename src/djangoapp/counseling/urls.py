from django.urls import path
from counseling import views



app_name = 'counseling'

urlpatterns = [
    # 학생
    path('info-student/', views.CounselingInfoStudent.as_view(), name='info-student'),
    path('scehdule-student/', views.CounselingScheduleStudent.as_view(), name='scehdule-student'),
    path('journal-student/', views.CounselingJournalStudent.as_view(), name='journal-student'),
    path('apply/', views.CounselingApply.as_view(), name='apply'),
    # 상담사
    path('info-counselor/', views.CounselingInfoCounselor.as_view(), name='info-counselor'),
    path('schedule-counselor/', views.CounselingScheduleCounselor.as_view(), name='schedule-counselor'),
    path('journal-counselor/', views.CounselingJournalCounselor.as_view(), name='journal-counselor'),
    path('feedback/', views.CounselingFeedback.as_view(), name='feedback'),
]