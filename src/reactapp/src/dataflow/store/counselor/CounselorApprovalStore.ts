import {
  IAutoRecommend,
  ICounselingSchedule,
} from "./../../interface/scheduleApproval";
import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import {
  BasicInfoType,
  DetailInfoType,
  ScheduleType,
} from "../../../components/pages/CounselingAdminPage/interface";
import { DateInfo } from "../../../components/Calendar";

class CounselorApprovalStore {
  auto_recommend: IAutoRecommend = {
    date: "",
    time: "",
  };
  counseling_schedule: ICounselingSchedule[] = [];

  scheduleMap: { [key: string]: DateInfo } = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchSchedule = (id: number) => {
    remote
      .get(`counseling/application-formal-approval?application_id=${id}`)
      .onSuccess((json: any) => {
        this.auto_recommend = json.auto_recommend;
        this.counseling_schedule = json.counseling_schedule;

        let newSchedule: { [key: string]: DateInfo } = {};
        this.counseling_schedule.forEach((schedule) => {
          newSchedule[schedule.session_date] = {
            task: schedule.session_status === "Done" ? "진행" : "예정",
          };
        });
        this.scheduleMap = newSchedule;
      })
      .onFailed((code: number, msg?: string) => {
        if (msg) alert(code + " " + msg);
      })
      .send();
  };
}

export const counselorApprovalStore = new CounselorApprovalStore();
