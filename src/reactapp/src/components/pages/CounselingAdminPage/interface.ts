export type StudentInfoType = {
  id: number;
  name: string;
  profileImg: string;
  studentId: string;
  schoolYear: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  counselingInfo?: Array<{
    date: string;
    time: number;
    isCompleted: boolean;
    appliedDate?: string;
    confirmedDate?: string;
    field?: string;
    type?: string;
  }>;
  feedbackData?: Array<{
    feedback: string;
    isCompleted: boolean;
  }>;
};

export const StudentInfoDefault: StudentInfoType = {
  id: -1,
  name: "",
  profileImg: "",
  studentId: "",
  schoolYear: "",
  email: "",
  dateOfBirth: "",
  phoneNumber: "",
};

export type UserInfoType = {
  id: number;
  user: {
    id: number;
    birth: string;
    phone_number: string;
    realname: string;
    student_number: string;
    user_type: string;
    username: string;
  };
};

export const UserInfoDefault: UserInfoType = {
  id: -1,
  user: {
    id: -1,
    birth: "",
    phone_number: "",
    realname: "",
    student_number: "",
    user_type: "",
    username: "",
  },
};

export type BasicInfoType = {
  id: number;
  student: UserInfoType;
  counselor: UserInfoType;
  counseling_application: {
    id: number;
    counseling_type: string;
    application_file: string;
    applied_at: string;
    student: UserInfoType;
  };
};

export type DetailInfoType = {
  id: number;
  student: UserInfoType;
  application_file: string;
  applied_at: string;
  counseling_type: string;
  test_date: string;
  test_timeslot: string;
  approved: boolean;
  denied: boolean;
  counseling_prefertimeslots: Array<{ id: number; timeslot: string }>;
  counseling_preferfields: Array<{ id: number; field: string }>;
};

export type ScheduleType = {
  id: number;
  counseling?: {
    id: number;
    student: UserInfoType | number;
    counselor: UserInfoType | number;
  };
  session_number: number;
  session_date: string;
  session_status: string;
  session_timeslot: string;
};
