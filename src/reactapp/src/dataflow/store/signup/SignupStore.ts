import { makeAutoObservable } from "mobx";

const FIELD = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  PHONE: "phone",
  SCHOOLID: "schoolId",
  BIRTHDAY: "birthday",
};

interface iSignupStore {
  getCurrentFormField(): Object;

  updateFormField(field: string, value: string): void;
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

  constructor() {
    makeAutoObservable(this);
  }
}

export { SignupStore, FIELD };
