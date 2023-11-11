export type StudentInfoType = {
  id: string,
  name: string,
  profileImg: string,
  studentId: string,
  schoolYear: string,
  email: string,
  dateOfBirth: string,
  phoneNumber: string,
  counselingInfo?: Array<{
    date: string,
    time: number,
    isCompleted: boolean,
    appliedDate?: string,
    confirmedDate?: string,
    field?: string,
    type?: string
  }>,
  feedbackData?: Array<{
    feedback: string,
    isCompleted: boolean
  }>
};

export const StudentInfoDefault: StudentInfoType = {
  id: "",
  name: "",
  profileImg: "",
  studentId: "",
  schoolYear: "",
  email: "",
  dateOfBirth: "",
  phoneNumber: "",
};