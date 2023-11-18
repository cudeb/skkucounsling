import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { ICounselingApplication, ICounselingSchedule } from "../../interface/counseling";

class CounselorStore {
  applicationInfo: ICounselingApplication[] = [];
  schedules: ICounselingSchedule[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchInfo = () => {
    remote
      .get("counseling/info-counselor/")
      .onSuccess((json: any) => {
        console.log(json);
        const applicationInfo: ICounselingApplication[] = json.counseling;
        this.applicationInfo = applicationInfo;
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };

  fetchSchedule = () => {
    remote
      .get("counseling/schedule-counselor/")
      .onSuccess((json: any) => {
        console.log(json);
        const schedules: ICounselingSchedule[] = json.counseling_schedule;
        this.schedules = schedules;
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };

  /*fetchJournal = (schedule_id: number) => {
    remote
      .get("counseling/journal-counselor")
      .addParams({
        schedule_id // 'schedule_id: schedule_id'와 동일
      })
      .onSuccess((json: any) => {
        console.log(json);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
      })
      .send();
  };*/

  /*addFeedback = (schedule_id: number, feedback: string) => {
    remote
      .post("counsel/feedback/")
      .addBody({
        schedule_id,
        feedback
      })
      .onSuccess((json: any) => {
        console.log(json);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  }*/
}

export const counselorStore = new CounselorStore();