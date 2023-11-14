import os
import django
from django.contrib.auth.hashers import make_password
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoapp.settings')
django.setup()

from common.models import User, Student, Counselor

def create_or_update_user(email, password, username, user_type, student_number, phone_number, birth):
    user = User.objects.filter(email=email).first()

    if user:
        user.password = make_password(password)
        user.username = username
        user.user_type = user_type
        user.student_number = student_number
        user.phone_number = phone_number
        user.birth = birth
        user.save()
    else:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            user_type=user_type,
            student_number=student_number,
            phone_number=phone_number,
            birth=birth
        )

    if user_type == 'student':
        student, created = Student.objects.get_or_create(user=user)
        return student
    elif user_type == 'counselor':
        counselor, created = Counselor.objects.get_or_create(user=user)
        return counselor

example_data = [
    {'email': 'user1@eskku.edu', 'password': 'user1student', 'username': '김철수', 'user_type': 'student', 'student_number': '2020300001', 'phone_number': '010-1111-2222', 'birth': '19900101'},
    {'email': 'user2@eskku.edu', 'password': 'user2student', 'username': '이영희', 'user_type': 'student', 'student_number': '2020300002', 'phone_number': '010-2222-3333', 'birth': '19910214'},
    {'email': 'user3@eskku.edu', 'password': 'user3counselor', 'username': '박상담사', 'user_type': 'counselor', 'student_number': 'C1001', 'phone_number': '010-3333-4444', 'birth': '19851120'},
    {'email': 'user4@eskku.edu', 'password': 'user4counselor', 'username': '최상담사', 'user_type': 'counselor', 'student_number': 'C1002', 'phone_number': '010-4444-5555', 'birth': '19780305'},
    {'email': 'user5@eskku.edu', 'password': 'user5student', 'username': '이진영', 'user_type': 'student', 'student_number': '2020300003', 'phone_number': '010-5555-6666', 'birth': '19930410'},
    {'email': 'user6@eskku.edu', 'password': 'user6student', 'username': '박지민', 'user_type': 'student', 'student_number': '2020300004', 'phone_number': '010-6666-7777', 'birth': '19950620'},
    {'email': 'user7@eskku.edu', 'password': 'user7counselor', 'username': '김상담사', 'user_type': 'counselor', 'student_number': 'C1003', 'phone_number': '010-7777-8888', 'birth': '19891015'},
    {'email': 'user8@eskku.edu', 'password': 'user8counselor', 'username': '이상담사', 'user_type': 'counselor', 'student_number': 'C1004', 'phone_number': '010-8888-9999', 'birth': '19720130'},
    {'email': 'user9@eskku.edu', 'password': 'user9student', 'username': '최예린', 'user_type': 'student', 'student_number': '2020300005', 'phone_number': '010-9999-0000', 'birth': '19970805'},
    {'email': 'user10@eskku.edu', 'password': 'user10student', 'username': '정하린', 'user_type': 'student', 'student_number': '2020300006', 'phone_number': '010-0000-1111', 'birth': '19901203'},
    {'email': 'user11@eskku.edu', 'password': 'user11counselor', 'username': '송상담사', 'user_type': 'counselor', 'student_number': 'C1005', 'phone_number': '010-1111-2222', 'birth': '19830525'},
    {'email': 'user12@eskku.edu', 'password': 'user12counselor', 'username': '이상담사', 'user_type': 'counselor', 'student_number': 'C1006', 'phone_number': '010-2222-3333', 'birth': '19790418'},
    {'email': 'user13@eskku.edu', 'password': 'user13student', 'username': '박재민', 'user_type': 'student', 'student_number': '2020300007', 'phone_number': '010-3333-4444', 'birth': '19940214'},
    {'email': 'user14@eskku.edu', 'password': 'user14student', 'username': '김민지', 'user_type': 'student', 'student_number': '2020300008', 'phone_number': '010-4444-5555', 'birth': '19960530'},
    {'email': 'user15@eskku.edu', 'password': 'user15counselor', 'username': '장상담사', 'user_type': 'counselor', 'student_number': 'C1007', 'phone_number': '010-5555-6666', 'birth': '19911210'},
    {'email': 'user16@eskku.edu', 'password': 'user16counselor', 'username': '윤상담사', 'user_type': 'counselor', 'student_number': 'C1008', 'phone_number': '010-6666-7777', 'birth': '19760822'},
    {'email': 'user17@eskku.edu', 'password': 'user17student', 'username': '최지원', 'user_type': 'student', 'student_number': '2020300009', 'phone_number': '010-7777-8888', 'birth': '19980308'},
    {'email': 'user18@eskku.edu', 'password': 'user18student', 'username': '박진우', 'user_type': 'student', 'student_number': '2020300010', 'phone_number': '010-8888-9999', 'birth': '19921117'},
    {'email': 'user19@eskku.edu', 'password': 'user19counselor', 'username': '이종민', 'user_type': 'counselor', 'student_number': 'C1009', 'phone_number': '010-9999-0000', 'birth': '19851003'},
    {'email': 'user20@eskku.edu', 'password': 'user20counselor', 'username': '한상담사', 'user_type': 'counselor', 'student_number': 'C1010', 'phone_number': '010-0000-1111', 'birth': '19791201'},
]


for data in example_data:
    create_or_update_user(**data)
