import { makeAutoObservable, computed } from "mobx";
import { remote } from "../../remote/RemoteSource";
import {
  ICounselingSchedule,
  ICounselingStudent,
  ICounselingStudentStatus,
  ICounselingTestSchedule,
} from "../../interface/counseling";
import { DateInfo } from "../../../components/Calendar";
import { compareDateOnly, numToDateString } from "../../DateFunc";

class StudentStore {
  schedules: ICounselingSchedule[] = [];
  testSchedules: ICounselingTestSchedule[] = [];
  calendarSchedule: { [key: string]: DateInfo } = {};
  constructor() {
    makeAutoObservable(this, {
      readCurrentFeedback: computed,
    });
  }

  /**
   * 진행중인, 출결 표시를 위한 정보
   */
  studentInfo?: ICounselingStudentStatus = undefined;

  /**
   * 모달에 띄울 상담 정보
   */
  mainModalSchedule?: ICounselingSchedule;
  mainModalScheduleDate?: Date;

  counselingFeedback: { [key: string]: string } = {};

  setFeedback = (feedback: string, date: string) => {
    if (feedback.trim()) this.counselingFeedback[date] = feedback;
  };

  readFeedback = (date: string) => {
    return this.counselingFeedback[date] || "";
  };

  get readCurrentFeedback() {
    return this.readFeedback(this.mainModalSchedule?.session_date || "");
  }

  setMainModalSchedule = (schedule: ICounselingSchedule | null | number[]) => {
    if (!schedule) {
      this.mainModalSchedule = undefined;
      this.mainModalScheduleDate = undefined;
      return;
    }
    if (schedule instanceof Array) {
      const [year, month, day] = schedule;
      const scheduleItem = this.schedules.find(
        (s) =>
          compareDateOnly(s.session_date, numToDateString(year, month, day)) ===
          0
      );
      if (scheduleItem) {
        this.setMainModalSchedule(scheduleItem);
      }
      return;
    }
    this.mainModalSchedule = schedule;
    this.mainModalScheduleDate = new Date(schedule.session_date);
  };

  fetchSchedule = () => {
    remote
      .get("counseling/schedule-student/")
      .onSuccess((json: any) => {
        const schedules: ICounselingSchedule[] = json.counseling_schedule;
        this.schedules = schedules;
        this.studentInfo = json;
        this.testSchedules = json.test_schedule;

        if (this.studentInfo?.last_schedule.session_date) {
        } else {
          this.studentInfo = undefined;
        }

        this.processSchedule();
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
      })
      .send();
  };

  processSchedule = () => {
    let schedule: { [key: string]: DateInfo } = {};

    this.testSchedules.forEach((session) => {
      schedule[session.test_date] = {
        task: "심리",
      };
    });
    this.schedules.forEach((session) => {
      //extract only xxxx-xx-xx

      const date_only = session.session_date.split("T")[0];
      schedule[date_only] = {
        task:
          session.session_status === "Yet"
            ? "예정"
            : session.session_status === "Done"
            ? "진행"
            : "심리",
      };
    });
    this.calendarSchedule = schedule;
  };
}

export const studentStore = new StudentStore();
