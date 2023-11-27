import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import {
  BasicInfoType,
  DetailInfoType,
  ScheduleType,
} from "../../../components/pages/CounselingAdminPage/interface";

class CounselorStore {
  basicInfo: Array<BasicInfoType> = [];
  detailInfo: Array<DetailInfoType> = [];
  schedules: Array<ScheduleType> = [];
  journal: string = "";

  private afterSuccessCallbackInfo: (() => void) | null = null;
  private afterSuccessCallbackDetail: (() => void) | null = null;
  private afterSuccessCallbackSchedule: (() => void) | null = null;
  private afterSuccessCallbackJournal: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchInfo = (afterSuccessCallbackInfo: () => void) => {
    this.afterSuccessCallbackInfo = afterSuccessCallbackInfo;
    remote
      .get("counseling/info-counselor/")
      .onSuccess((json: any) => {
        const basicInfo = json.counseling;
        this.basicInfo = basicInfo;
        if (this.afterSuccessCallbackInfo) {
          this.afterSuccessCallbackInfo();
        }
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };

  fetchDetail = (afterSuccessCallbackDetail: () => void) => {
    this.afterSuccessCallbackDetail = afterSuccessCallbackDetail;
    remote
      .get("counseling/applications/")
      .onSuccess((json: any) => {
        const detailInfo = json.counseling_applications;
        this.detailInfo = detailInfo;
        if (this.afterSuccessCallbackDetail) {
          this.afterSuccessCallbackDetail();
        }
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };

  fetchSchedule = (afterSuccessCallbackSchedule: () => void) => {
    this.afterSuccessCallbackSchedule = afterSuccessCallbackSchedule;
    remote
      .get("counseling/schedule-counselor/")
      .onSuccess((json: any) => {
        const schedules = json.counseling_schedule;
        this.schedules = schedules;
        if (this.afterSuccessCallbackSchedule) {
          this.afterSuccessCallbackSchedule();
        }
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };

  fetchJournal = (
    schedule_id: number,
    afterSuccessCallbackJournal: () => void
  ) => {
    this.afterSuccessCallbackJournal = afterSuccessCallbackJournal;
    remote
      .get("counseling/journal-counselor")
      .addParams({ schedule_id })
      .onSuccess((json: any) => {
        const journal = json.counseling_journals.feedback;
        this.journal = journal;
        if (this.afterSuccessCallbackJournal) {
          this.afterSuccessCallbackJournal();
        }
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };

  addFeedback = (schedule_id: number, feedback: string) => {
    remote
      .post("counsel/feedback/")
      .addBody({ schedule_id, feedback })
      .onSuccess((json: any) => {
        console.log(json);
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };
}

export const counselorStore = new CounselorStore();
