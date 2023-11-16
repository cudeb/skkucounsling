from django.urls import path
from counseling import views



app_name = 'counseling'

urlpatterns = [
    # 학생
    path('info-student/', views.CounselingInfoStudent.as_view(), name='info-student'),
    path('application-student/',views.CounselingApplicationStudent.as_view(),name='application-student'),
    path('schedule-student/', views.CounselingScheduleStudent.as_view(), name='schedule-student'),
    path('journal-student/', views.CounselingJournalStudent.as_view(), name='journal-student'),
    path('apply/', views.CounselingApply.as_view(), name='apply'),
    # 상담사
    path('info-counselor/', views.CounselingInfoCounselor.as_view(), name='info-counselor'),
    path('schedule-counselor/', views.CounselingScheduleCounselor.as_view(), name='schedule-counselor'),
    path('journal-counselor/', views.CounselingJournalCounselor.as_view(), name='journal-counselor'),
    path('feedback/', views.CounselingFeedback.as_view(), name='feedback'),
    path('schedule-update/',views.CounselingScheduleUpdate.as_view(),name='schedule-update'),
    path('schedule-add',views.CounselingScheduleAdd.as_view(),name='schedule-add'),
    path('applications/',views.CounselingApplications.as_view(),name='applications'),
    path('application-formal-approval/',views.CounselingApplicationFormalApproval.as_view(),name='application-formal-approval'),
    path('application-approval/',views.CounselingApplicationApproval.as_view(),name='application-approval'),
    path('application-denial/',views.CounselingApplicationDenial.as_view(),name='application-denial'),
]