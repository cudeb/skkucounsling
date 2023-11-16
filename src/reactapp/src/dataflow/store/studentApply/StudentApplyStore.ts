import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";

const APPLY_FIELD = {
  APPLICATION: "application",
  APPLIED_AT: "applied_at",
  COUNSELING_TYPE: "counseling_type",
  TEST_DATE: "test_date",
  TEST_TIMESLOT: "test_timeslot",
  PREFER_TIMESLOT: "prefer_timeslots",
  PREFER_FIELDS: "prefer_fields",
};

interface iStudentApplyStore {
  getCurrentFormField(): Object;

  updateFormField(field: string, value: any): void;

  apply(): void;

  isApplySuccess: boolean;
  applyErrorMsg?: string;
}

class StudentApplyStore implements iStudentApplyStore {
  currentForm: FormData = new FormData();

  getCurrentFormField(): FormData {
    return this.currentForm;
  }

  updateFormField(field: string, value: any): void {
    this.currentForm.append( field, value );
  }

  isApplySuccess: boolean = false;
  applyErrorMsg?: string = undefined;

  /**
   * Validate form fields.
   * @returns true if all fields are valid, false otherwise.
   */
  private formFieldValidation = () => {
    let match_type = false;
    let match_time = false;
    
    ['personal_1', 'personal_5', 'personal_10'].forEach((type) => {
      if (type===this.currentForm.get(APPLY_FIELD.COUNSELING_TYPE)) {
        match_type=true
      }
    });
    
    if(match_type===false) {
      this.applyErrorMsg = "상담 종류를 선택해주세요.";
      return false;
    }

    if(this.currentForm.get(APPLY_FIELD.PREFER_FIELDS)===""){
      this.applyErrorMsg = "상담 분야를 하나 이상 선택해주세요.";
      return false;
    }

    if(this.currentForm.get(APPLY_FIELD.PREFER_TIMESLOT)===""){
      this.applyErrorMsg = "희망 상담 시간을 하나 이상 선택해주세요.";
      return false;
    }

    ['10','11','12','13','14','15','16'].forEach((time) => {
      if (time===this.currentForm.get(APPLY_FIELD.TEST_TIMESLOT)) {
        match_time=true
      }
    });
    
    if(match_time===false) {
      this.applyErrorMsg = "희망 심리 검사 시간을 선택해주세요.";
      return false;
    }

    if(this.currentForm.get(APPLY_FIELD.TEST_DATE)===""){
      this.applyErrorMsg = "희망 심리 검사 날짜를 선택해주세요.";
      return false;
    }

    if(this.currentForm.get(APPLY_FIELD.APPLICATION)==null){
      this.applyErrorMsg = "신청서를 업로드해주세요.";
      return false;
    }

    return true;
  };
  /**
   * request application to server.
   * if success, set isApplySuccess to true.
   */
  apply = () => {
    if (!this.formFieldValidation()) {
      return;
    }

    console.log(this.currentForm)
    remote
      .post("counseling/apply/")
      .setType("multipart")
      .addFormBody(this.currentForm)
      .onSuccess((json: string) => {
        this.isApplySuccess = true;
      })
      .onFailed((code: number, msg?: string) => {
        this.applyErrorMsg = msg;
      })
      .send();
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export { StudentApplyStore, APPLY_FIELD };
