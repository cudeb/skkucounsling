import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { issueCSRF } from "../../remote/RemoteInstruct";
import { cookieManager } from "../../remote/CookieManager";

const SIGNUP_FIELD = {
  NAME: "username",
  EMAIL: "email",
  PASSWORD: "password1",
  CONFIRM_PASSWORD: "password2",
  PHONE: "phone_number",
  SCHOOLID: "student_number",
  BIRTHDAY: "birth",
};

interface iSignupStore {
  getCurrentFormField(): Object;

  updateFormField(field: string, value: string): void;

  signUp(): void;

  isSignUpSuccess: boolean;
  signUpErrorMsg?: string;
}

class SignupStore implements iSignupStore {
  currentForm: Record<string, string> = {};

  getCurrentFormField(): Record<string, string> {
    return this.currentForm;
  }

  updateFormField(field: string, value: string): void {
    this.currentForm = {
      ...this.currentForm,
      [field]: value,
    };
  }

  isSignUpSuccess: boolean = false;
  signUpErrorMsg?: string = undefined;

  private formFieldValidation = () => {
    let isValid = true;
    [
      SIGNUP_FIELD.NAME,
      SIGNUP_FIELD.EMAIL,
      SIGNUP_FIELD.PASSWORD,
      SIGNUP_FIELD.CONFIRM_PASSWORD,
      SIGNUP_FIELD.PHONE,
      SIGNUP_FIELD.SCHOOLID,
      SIGNUP_FIELD.BIRTHDAY,
    ].forEach((field) => {
      if (
        !this.currentForm[field] ||
        !this.currentForm[field].trim() ||
        this.currentForm[field].length === 0
      ) {
        this.signUpErrorMsg = "모든 항목을 입력해주세요.";
        isValid = false;
      }
    });

    if (!isValid) {
      return isValid;
    }

    if (
      this.currentForm[SIGNUP_FIELD.PASSWORD] !==
      this.currentForm[SIGNUP_FIELD.CONFIRM_PASSWORD]
    ) {
      this.signUpErrorMsg = "비밀번호 확인이 일치하지 않습니다.";
      return false;
    }

    return isValid;
  };

  signUp = () => {
    if (!this.formFieldValidation()) {
      return;
    }

    cookieManager.updateCookie(
      "useremail",
      this.currentForm[SIGNUP_FIELD.EMAIL],
      1
    );

    remote
      .post("signup/")
      .addHeader("content-type", "form-data")
      .addBody({
        ...this.currentForm,
        user_type: "student",
      })
      .onSuccess((json: string) => {
        this.isSignUpSuccess = true;
      })
      .onFailed((code: number, msg?: string) => {
        this.signUpErrorMsg = msg;
      })

      .send();
  };

  constructor() {
    makeAutoObservable(this);
    issueCSRF();
  }
}

export { SignupStore, SIGNUP_FIELD };
