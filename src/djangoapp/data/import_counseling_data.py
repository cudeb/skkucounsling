import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoapp.settings')
django.setup()
from common.models import User, Student, Counselor
from counseling.models import CounselingApplication, CounselingPrefertimeslot, CounselingPreferfield, Counseling, CounselingTestSchedule, CounselingSchedule, CounselingJournals
from django.core.files import File
from random import randint


def reset_counseling_tables():

    CounselingJournals.objects.all().delete()
    CounselingSchedule.objects.all().delete()
    CounselingTestSchedule.objects.all().delete()
    Counseling.objects.all().delete()
    CounselingPreferfield.objects.all().delete()
    CounselingPrefertimeslot.objects.all().delete()
    CounselingApplication.objects.all().delete()


def insert_example_counseling_data(example_counseling_data):
    # user1@eskku.edu에서 user20@eskku.edu까지의 사용자 가져오기
    users = User.objects.filter(email__in=[f'user{i}@eskku.edu' for i in range(1, 21)])

    # 이미 생성된 Student 및 Counselor 데이터 가져오기
    students = Student.objects.filter(user__in=users)[:5]
    counselors = Counselor.objects.filter(user__in=users)[:2]

    for i, student in enumerate(students):
        data = example_counseling_data[i]

        # CounselingApplication 모델에 대한 예제 데이터
        application_data = {
            'student': student,
            'counseling_type': data['counseling_type'],
            'test_date': data['test_date'],
            'test_timeslot': data['test_timeslot']
        }

        # 파일 경로 설정 (실제 파일의 경로로 수정해주세요)
        file_path = '/path/to/your/file/application_file.pdf'

        # 파일이 존재할 때만 application_file 필드 추가
        if file_path and os.path.exists(file_path):
            with open(file_path, 'rb') as file:
                application_data['application_file'] = File(file)

        # update_or_create 메서드를 사용하여 파일이 존재하는 경우 업데이트 또는 생성
        application, created = CounselingApplication.objects.update_or_create(
            student=student,
            defaults=application_data
        )

        for timeslot in data['pref_timeslots']:
            pref_timeslot, created = CounselingPrefertimeslot.objects.update_or_create(
                counseling_application=application,
                timeslot=timeslot
            )

        for field in data['fields']:
            pref_field, created = CounselingPreferfield.objects.update_or_create(
                counseling_application=application,
                field=field
            )

        counselor = counselors[randint(0, 1)]

        counseling, created = Counseling.objects.update_or_create(
            counseling_application=application,
            student=student,
            defaults={'counselor': counselor}
        )

        test_schedule, created = CounselingTestSchedule.objects.update_or_create(
            counseling=counseling,
            date=data['test_date'],
            timeslot=data['test_timeslot']
        )

        schedule, created = CounselingSchedule.objects.update_or_create(
            counseling=counseling,
            session_date=data['session_date'],
            session_timeslot=data['session_timeslot'],
            session_number=data['session_number'],
            session_status=data['session_status']
        )



example_counseling_data = [
    {
        "counseling_type": "personal_1", #one of ["personal_1", "personal_5", "personal_10"] #todo: add 심리검사 상담
        "test_date": "2023-11-27",
        "test_timeslot": "MON1",
        "pref_timeslots": ["MON1", "TUE2", "WED3"],
        "fields": ['대인관계'], #one of ['대인관계','성격 및 적응','학업 및 진로','심리 및 정서','가족 관계','결혼 및 연애','종교 및 가치관']
        "session_timeslot": "TUE2",
        "session_date": "2023-11-28",
        "session_number": 1,
        "session_status": "Yet"
    },
    {
        "counseling_type": "personal_1",
        "test_date": "2023-11-28",
        "test_timeslot": "TUE2",
        "pref_timeslots": ["TUE2", "WED3", "THU4"],
        "fields": ['학업 및 진로'],
        "session_timeslot": "THU4",
        "session_date": "2023-11-30",
        "session_number": 1,
        "session_status": "Yet"
    },
    {
        "counseling_type": "personal_5",
        "test_date": "2023-11-29",
        "test_timeslot": "WED3",
        "pref_timeslots": ["WED3", "THU4", "FRI5"],
        "fields": ['심리 및 정서','가족 관계' ],
        "session_timeslot": "THU4",
        "session_date": "2023-11-30",
        "session_number": 1,
        "session_status": "Yet"
    },
    {
        "counseling_type": "personal_10",
        "test_date": "2023-11-28",
        "test_timeslot": "TUE4",
        "pref_timeslots": ["TUE4", "WED5", "THU6"],
        "fields": ['학업 및 진로'],
        "session_timeslot": "WED5",
        "session_date": "2023-11-29",
        "session_number": 1,
        "session_status": "Yet"
    },
    {
        "counseling_type": "personal_10",
        "test_date": "2023-11-28",
        "test_timeslot": "TUE5",
        "pref_timeslots": ["TUE5", "WED6", "THU3"],
        "fields": ['가족 관계','결혼 및 연애'],
        "session_timeslot": "WED6",
        "session_date": "2023-11-29",
        "session_number": 1,
        "session_status": "Yet"
    }
]



if __name__ == '__main__':
    reset_counseling_tables()
    insert_example_counseling_data(example_counseling_data)




