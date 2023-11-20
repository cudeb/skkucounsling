import { StudentInfoType } from "./interface";

export const studentData: Array<StudentInfoType> = [
  {
    id: 0,
    name: "김성균",
    profileImg: "img0",
    studentId: "2020310000",
    schoolYear: "1학년 1학기",
    email: "kim@g.skku.edu",
    dateOfBirth: "1998 / 01 / 01",
    phoneNumber: "010-1398-0000",
    counselingInfo: [
      {
        date: "23.11.01",
        time: 14,
        isCompleted: true,
        appliedDate: "23.08.01",
        confirmedDate: "23.09.01",
        field: "학업 고민",
        type: "10회기 개인상담"
      },
      {
        date: "23.11.11",
        time: 17,
        isCompleted: false
      }
    ],
    feedbackData: [
      {
        feedback: "규칙적인 생활 패턴 유지하기",
        isCompleted: true
      },
      {
        feedback: "커피와 음주는 주 1회로 제한하기",
        isCompleted: false
      }
    ]
  },
  {
    id: 1,
    name: "이성균",
    profileImg: "img1",
    studentId: "2021310000",
    schoolYear: "1학년 2학기",
    email: "lee@g.skku.edu",
    dateOfBirth: "1998 / 02 / 01",
    phoneNumber: "010-1398-1111"
  },
  {
    id: 2,
    name: "박성균",
    profileImg: "img2",
    studentId: "2022310000",
    schoolYear: "2학년 1학기",
    email: "park@g.skku.edu",
    dateOfBirth: "1998 / 03 / 01",
    phoneNumber: "010-1398-2222"
  },
  {
    id: 3,
    name: "최성균",
    profileImg: "img3",
    studentId: "2023310000",
    schoolYear: "2학년 2학기",
    email: "choi@g.skku.edu",
    dateOfBirth: "1998 / 04 / 01",
    phoneNumber: "010-1398-3333"
  },
  {
    id: 4,
    name: "정성균",
    profileImg: "img4",
    studentId: "2024310000",
    schoolYear: "3학년 1학기",
    email: "jung@g.skku.edu",
    dateOfBirth: "1998 / 05 / 01",
    phoneNumber: "010-1398-4444"
  },
];