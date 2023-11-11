from django.db import models
from common.models import Student, Counselor 
# Create your models here.

class CounselingApplication(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE) # FK
    application_file =  models.FileField(upload_to="application", null=False)
    applied_at = models.DateTimeField(auto_now_add=True)
    counseling_type = models.CharField(max_length=30)
    counseling_field = models.CharField(max_length=30)


class CounselingPrefertimeslot(models.Model):
    counseling_application = models.ForeignKey(CounselingApplication, on_delete=models.CASCADE) # FK
    timeslot = models.CharField(max_length=10)


class Counseling(models.Model):
    counseling_application = models.ForeignKey(CounselingApplication, on_delete=models.CASCADE) # FK
    student = models.ForeignKey(Student, on_delete=models.CASCADE) # FK
    counselor = models.ForeignKey(Counselor, on_delete=models.CASCADE) # FK


class CounselingTestSchedule(models.Model):
    counseling = models.ForeignKey(Counseling, on_delete=models.CASCADE) # FK
    date = models.DateTimeField()
    timeslot = models.CharField(max_length=10)

class CounselingSchedule(models.Model):
    counseling = models.ForeignKey(Counseling, on_delete=models.CASCADE) # FK
    session_date = models.DateField()
    session_timeslot = models.CharField(max_length=10)
    session_number = models.IntegerField()
    session_status = models.CharField(max_length=10)


class CounselingJournals(models.Model):
    counseling_schedule = models.ForeignKey(CounselingSchedule, on_delete=models.CASCADE) # FK
    feedback = models.CharField(max_length=300)
