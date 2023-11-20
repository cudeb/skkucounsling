import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { ICounselingApplicationDetail } from "../../interface/counselingApplication";

// AdminApplicationCheckPage, AdminPersonalApplicationCheckPage 에 사용
class CounselorApplicationStore {
  counselingApplications: ICounselingApplicationDetail[] = [];

  currentApplication: ICounselingApplicationDetail = {
    id: 0,
    student: {
      id: 0,
      user: {
        birth: "",
        id: 0,
        phone_number: "",
        realname: "",
        student_number: "",
        user_type: "",
        username: "",
        email: ""
      },
    },
    application_file: null,
    applied_at: "",
    counseling_type: "",
    test_date: "",
    test_timeslot: "",
    approved: false,
    denied: false,
    counseling_prefertimeslots: [],
    counseling_preferfields: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  // 조건 상관 없이 모든 신청을 가져옴
  // 일단 구현했는데, 실질적으로 쓰지 않을 것 (상담사가 상담신청 목록을 보는 페이지 (AdminApplicationCheckPage)에서는 아직 처리되지 않은 상담신청만 보여줄 예정이기 때문)
  fetchCouselingApplications = () => {
    remote
      .get("counseling/applications/")
      .onSuccess((json: any) => {
        const couselingApplications: ICounselingApplicationDetail[] =
          json.counseling_applications;
        this.counselingApplications = couselingApplications;
        console.log(couselingApplications);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };

  // 이미 승인되거나 거절되지 않은 상담신청만 가져옴 (아직 처리되지 않은 상담신청)
  // 상담사가 상담신청 목록을 보는 페이지 (AdminApplicationCheckPage) 에서 필터링되지 않은 초기 데이터를 가져올 때 사용
  fetchUnprocessedCouselingApplications = () => {
    remote
      .get("counseling/applications/")
      .onSuccess((json: any) => {
        const couselingApplications: ICounselingApplicationDetail[] =
          json.counseling_applications.filter(
            (application: ICounselingApplicationDetail) =>
              !application.denied && !application.approved
          );
        this.counselingApplications = couselingApplications;
        // console.log(couselingApplications);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };

  // 필터링 된 상담신청만 가져옴 (아직 처리되지 않은 상담신청 중에서)
  // 상담사가 상담신청 목록을 보는 페이지 (AdminApplicationCheckPage) 에서 필터링 버튼을 눌러 필터링된 데이터를 가져올 때 사용
  fetchFilteredCouselingApplications = (
    counselType: string,
    counselField: string,
    desiredDay: string,
    desiredTime: string
  ) => {
    remote
      .get("counseling/applications/")
      .onSuccess((json: any) => {
        const couselingApplications: ICounselingApplicationDetail[] =
          json.counseling_applications.filter(
            (application: ICounselingApplicationDetail) =>
              !application.denied && !application.approved
          );

        let filteredByType:ICounselingApplicationDetail[]=couselingApplications;
        if(counselType!==""){
          console.log("type filter");
          filteredByType = couselingApplications.filter(
            (application: ICounselingApplicationDetail) =>
              application.counseling_type === counselType
          );
        };
        
        let filteredByField:ICounselingApplicationDetail[]=filteredByType;
        if(counselField!==""){
          console.log("field filter");
          filteredByField = filteredByType.filter(
            (application: ICounselingApplicationDetail) =>
              application.counseling_preferfields.some(
                (f) => f.field === counselField
              )
          );
        }

        let filteredByTimeSlot:ICounselingApplicationDetail[]=filteredByField;
        if (desiredDay!=="" && desiredTime!==""){
          console.log("day filter");
          const desiredDayAndTime: string = desiredDay + desiredTime;
          filteredByTimeSlot = filteredByField.filter(
            (application: ICounselingApplicationDetail) =>
              application.counseling_prefertimeslots.some(
                (f) => f.timeslot === desiredDayAndTime
              )
          );
        }

        this.counselingApplications = filteredByTimeSlot;
        // console.log(filteredByTimeSlot);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };

  // 신청서의 id를 받고, 해당 신청서 데이터만 가져옴
  // 상담사가 개별 상담신청을 조회하는 페이지 'AdminPersonalApplicationCheckPage'에 사용
  fetchhCurrentApplication = (applicationId: number) => {
    remote
      .get("counseling/applications/")
      .onSuccess((json: any) => {
        const currentApplication: ICounselingApplicationDetail[] =
          json.counseling_applications.filter(
            (application: ICounselingApplicationDetail) =>
              application.id == applicationId
          );
        this.currentApplication = currentApplication[0];
        console.log(currentApplication);
      })
      .onFailed((code: number, msg?: string) => {
        console.log(code);
        if (msg) console.log(msg);
      })
      .send();
  };
}

export const counselorApplicationStore = new CounselorApplicationStore();
