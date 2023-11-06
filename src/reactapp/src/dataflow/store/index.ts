import { MainStore } from "./main/mainstore";
import { SignupStore } from "./signup/SignupStore";

const mainStore = new MainStore();
const signupStore = new SignupStore();

export { mainStore, signupStore };
