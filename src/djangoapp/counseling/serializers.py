from rest_framework import serializers
from . import models
from common.serializers import StudentSerializer, CounselorSerializer

class CounselingApplicationSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    class Meta:
        model = models.CounselingApplication
        fields = (
            "id",
            "student",
            "application_file",
            "applied_at",
            "counseling_type"
        )
        

class CounselingSerializer(serializers.ModelSerializer):
    counseling_application = CounselingApplicationSerializer()
    student = StudentSerializer()
    counselor = CounselorSerializer()
    class Meta:
        model = models.Counseling
        fields = (
            "id",
            "counseling_application",
            "student",
            "counselor",
        )
        
        
class CounselingScheduleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.CounselingSchedule
        fields = (
            "id",
            "counseling",
            "session_date",
            "session_timeslot",
            "session_number",
            "session_status"
        )
        
        
class CounselingJournalsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CounselingJournals
        fields = (
            "id",
            "counseling_schedule",
            "feedback"
        )

class CounselingPrefertimeslotSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.CounselingPrefertimeslot
        fields = (
            "id",
            "timeslot"

        )

class CounselingPreferfieldSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.CounselingPreferfield
        fields = (
            "id",
            "field"
        )
