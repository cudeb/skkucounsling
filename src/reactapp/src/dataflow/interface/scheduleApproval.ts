import { UserInfoType } from "../../components/pages/CounselingAdminPage/interface";


export type ICounselingApplication = {
  id: number;
  student: UserInfoType;
  application_file: string;
  applied_at: string;
  counseling_type: string;
};

export type ICounselingSchedule = {
  id: number;
  counseling?: {
    counseling_application : ICounselingApplication;
    student: UserInfoType;
    counselor: UserInfoType;
  };
  session_number: number;
  session_date: string;
  session_timeslot: string;
  session_status: string;
};

export type IAutoRecommend = {
    date: string;
    time: string;
  };

