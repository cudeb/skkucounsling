import { LoginStore } from "./login/LoginStore";
import { MainStore } from "./main/mainstore";
import { SignupStore } from "./signup/SignupStore";
import { StudentApplyStore } from "./studentApply/StudentApplyStore";

const mainStore = new MainStore();
const signupStore = new SignupStore();
const loginStore = new LoginStore();
const studentApplyStore = new StudentApplyStore();

export { mainStore, signupStore, loginStore, studentApplyStore };
