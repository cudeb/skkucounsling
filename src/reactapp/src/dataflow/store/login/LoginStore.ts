import { makeAutoObservable } from "mobx";
import { remote } from "../../remote/RemoteSource";
import { cookieManager } from "../../remote/CookieManager";
import {
  ACCOUNT_TYPE,
  COOKIE_REFRESH,
  COOKIE_TOKEN,
} from "../../../const/RemoteConst";

class LoginStore {
  errorMsg?: string = undefined;
  loginSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.initStatus();
  }

  initStatus = () => {
    this.errorMsg = undefined;
    this.loginSuccess = false;
    if (cookieManager.readCookie(COOKIE_TOKEN)) {
      this.loginSuccess = true;
    }
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
      .onSuccess((json: any) => {
        console.log("refresh success");
        //"json" to json object
        if (json.user_type) {
          if (json.user_type === "student") {
            cookieManager.updateCookie(ACCOUNT_TYPE, "s", 1);
          } else {
            cookieManager.updateCookie(ACCOUNT_TYPE, "t", 1);
          }
        }

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
        this.loginSuccess = true;
      })
      .onFailed((code: number, msg?: string) => {
        console.log("login failed");
        if (code === 401) {
          this.errorMsg = "계정 정보가 없습니다.";
        } else {
          this.errorMsg = msg;
        }
      })
      .send();
  };
}

export { LoginStore };
