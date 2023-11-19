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

export interface IApplicationForm {
  id: number;
  student: number;
  application_file: File | null;
  applied_at: string;
  approved: boolean;
  denied: boolean;
  counseling_preferfields: Array<IPreferFields>;
  counseling_prefertimeslots: Array<IPreferTimeslots>;
  counseling_type: string;
  test_date: string;
  test_timeslot: string;
}

export interface IPreferFields {
  id: number;
  field: string;
}

export interface IPreferTimeslots {
  id: number;
  timeslot: string;
}