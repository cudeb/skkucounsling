import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { ICounselingStudent } from "../../interface/counseling";
import { DateInfo } from "../../../components/Calendar";

class StudentStore {
  schedules: ICounselingStudent[] = [];
  calendarSchedule: { [key: string]: DateInfo } = {};
  constructor() {
    makeAutoObservable(this);
  }

  fetchSchedule = () => {
    remote
      .get("counseling/info-student/")
      .onSuccess((json: any) => {
        //todo: Case the json and store in this object.
        console.log("fetch success");
        const schedules: ICounselingStudent[] = json.counseling;
        this.schedules = schedules;

        this.processSchedule();
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
      })
      .send();
  };

  processSchedule = () => {
    let schedule: { [key: string]: DateInfo } = {};
    const application_schedule = studentStore.schedules.map((schedule) => {
      return schedule.counseling_application.applied_at;
    });
    application_schedule.forEach((date) => {
      //extract only xxxx-xx-xx
      const date_only = date.split("T")[0];
      schedule[date_only] = { task: "심리" };
    });

    this.calendarSchedule = schedule;
    console.log(this.calendarSchedule);
  };
}

export const studentStore = new StudentStore();
