import { LoginStore } from "./login/LoginStore";
import { MainStore } from "./main/mainstore";
import { SignupStore } from "./signup/SignupStore";

const mainStore = new MainStore();
const signupStore = new SignupStore();
const loginStore = new LoginStore();

export { mainStore, signupStore, loginStore };
