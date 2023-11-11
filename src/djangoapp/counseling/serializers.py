from rest_framework import serializers
from . import models


class CounselingApplicationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.CounselingApplication
        fields = (
            "student",
            "application_file",
            "applied_at",
            "counseling_type",
            "counseling_field"
        )
        

class CounselingSerializer(serializers.ModelSerializer):
    counseling_application = CounselingApplicationSerializer()
    class Meta:
        model = models.Counseling
        fields = (
            "counseling_application",
            "student",
            "counselor",
        )
        
        
class CounselingScheduleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.CounselingSchedule
        fields = (
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
            "counseling_schedule",
            "feedback"
        )

    