from django.db import models
from common.models import Student, Counselor 
# Create your models here.

class CounselingApplication(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE) # FK
    application_file =  models.FileField(upload_to="application", null=False)
    applied_at = models.DateTimeField(auto_now_add=True)
    counseling_type = models.CharField(max_length=30)
    approved = models.BooleanField(default=False)
    denied = models.BooleanField(default=False)


class CounselingPrefertimeslot(models.Model):
    id = models.AutoField(primary_key=True)
    counseling_application = models.ForeignKey(CounselingApplication, on_delete=models.CASCADE) # FK
    timeslot = models.CharField(max_length=10)

class CounselingPreferfield(models.Model):
    id = models.AutoField(primary_key=True)
    counseling_application = models.ForeignKey(CounselingApplication, on_delete=models.CASCADE) # FK
    field = models.CharField(max_length=100)

class Counseling(models.Model):
    id = models.AutoField(primary_key=True)
    counseling_application = models.ForeignKey(CounselingApplication, on_delete=models.CASCADE) # FK
    student = models.ForeignKey(Student, on_delete=models.CASCADE) # FK
    counselor = models.ForeignKey(Counselor, on_delete=models.CASCADE,null=True) # FK


class CounselingTestSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    counseling = models.ForeignKey(Counseling, on_delete=models.CASCADE) # FK
    date = models.DateTimeField()
    timeslot = models.CharField(max_length=10)

class CounselingSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    counseling = models.ForeignKey(Counseling, on_delete=models.CASCADE) # FK
    session_date = models.DateField()
    session_timeslot = models.CharField(max_length=10)
    session_number = models.IntegerField()
    session_status = models.CharField(max_length=10)


class CounselingJournals(models.Model):
    id = models.AutoField(primary_key=True)
    counseling_schedule = models.OneToOneField(CounselingSchedule, on_delete=models.CASCADE) # FK
    feedback = models.CharField(max_length=300)
