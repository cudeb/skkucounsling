export type ICounselingStudent = {
  id: number,
  counseling_application: ICounselingApplication,
  student: number,
  counselor: number,
};

export type ICounselingApplication = {
  id: number,
  student: number,
  application_file: string | null,
  applied_at: string,
  counseling_type: string,
};

export type ICounselingSchedule = {
  id: number,
  counseling: number,
  session_number: number,
  session_date: string,
  session_timeslot: string,
  session_status: string,
};