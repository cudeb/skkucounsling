interface ICounselingStudent {
  id: number;
  counseling_application: ICounselingApplication;
  student: number;
  counselor: number;
}

interface ICounselingApplication {
  id: number;
  student: number;
  application_file: string | null;
  applied_at: string;
  counseling_type: string;
}

export type { ICounselingStudent, ICounselingApplication };
