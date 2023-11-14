import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";

class StudentStore {
  schedules = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchSchedule = () => {
    remote
      .get("counseling/info-student/")
      .onSuccess((json: string) => {
        //todo: Case the json and store in this object.
        console.log("fetch success");
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
      })
      .send();
  };
}

export const studentStore = new StudentStore();
