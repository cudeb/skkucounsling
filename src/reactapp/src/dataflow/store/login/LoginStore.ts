import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { cookieManager } from "../../remote/CookieManager";
import { COOKIE_REFRESH } from "../../../const/RemoteConst";

class LoginStore {
  errorMsg?: string = undefined;
  loginSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initStatus = () => {
    this.errorMsg = undefined;
    this.loginSuccess = false;
  };

  refreshToken = () => {
    const refreshToken = cookieManager.readCookie(COOKIE_REFRESH);
    if (!refreshToken) {
      return;
    }
    remote
      .post("common/refresh/")
      .addBody({
        refresh: refreshToken,
      })
      .onSuccess((json: string) => {
        console.log("refresh success");
        this.loginSuccess = true;
      })
      .onFailed((code: number, msg?: string) => {
        console.log("refresh failed");
        this.errorMsg = msg;
        this.loginSuccess = false;
      })
      .send();
  };

  loginWithAccount = (email: string, password: string) => {
    remote
      .post("common/login/")
      .addBody({
        email: email,
        password: password,
      })
      .onSuccess((json: string) => {
        console.log("login success");
      })
      .onFailed((code: number, msg?: string) => {
        console.log("login failed");
        this.errorMsg = msg;
      })
      .send();
  };
}

export { LoginStore };
