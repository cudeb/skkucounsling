import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { ICounselingStudent } from "../../interface/counseling";

class StudentStore {
  schedules: ICounselingStudent[] = [];
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
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
      })
      .send();
  };
}

export const studentStore = new StudentStore();
