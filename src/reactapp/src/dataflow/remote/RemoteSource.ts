import {
  COOKIE_TOKEN,
  COOKIE_REFRESH,
  RemoteSourceUrl,
  CSRF_TOKEN,
} from "../../const/RemoteConst";
import { loginStore } from "../store";
import { cookieManager } from "./CookieManager";

class Request {
  url: string;
  method: string;
  headers?: Headers;
  body?: any;
  params?: [string: any];
  type = "application/json";
  formBody?: FormData;

  constructor(url: string, method: string) {
    this.url = RemoteSourceUrl.release + url;
    this.method = method;
  }

  addHeader = (key: string, value: string) => {
    if (!this.headers) {
      this.headers = new Headers();
    }
    this.headers.append(key, value);
    return this;
  };

  setType = (type: string) => {
    this.type = type;
    return this;
  };

  addBody = (body: any) => {
    this.body = body;
    return this;
  };

  addFormBody = (formBody: FormData) => {
    this.formBody = formBody;
    return this;
  };

  addParams = (params: [string: any]) => {
    this.params = params;
    return this;
  };

  successCallback = (json: string) => {};
  failedCallback = (code: number, msg?: string) => {};

  onSuccess = (callback: (json: string) => void) => {
    this.successCallback = callback;
    return this;
  };

  onFailed = (callback: (code: number, msg?: string) => void) => {
    this.failedCallback = callback;
    return this;
  };

  send = () => {
    remote.send(this);
  };
}

class RemoteSource {
  defaultHeaders = () => {
    let token = cookieManager.readCookie(COOKIE_TOKEN);
    let refresh = cookieManager.readCookie(COOKIE_REFRESH);
    let csrf = cookieManager.readCookie(CSRF_TOKEN);
    return {
      ...(token && { Authorization: "Bearer  " + token }), // if token is not null, add Authorization header (token
      ...(refresh && { Refresh: refresh }),
      ...(csrf && { "X-CSRFToken": csrf }),
    };
  };

  get = (url: string) => {
    return new Request(url, "GET");
  };

  post = (url: string) => {
    return new Request(url, "POST");
  };

  put = (url: string) => {
    return new Request(url, "PUT");
  };

  delete = (url: string) => {
    return new Request(url, "DELETE");
  };

  send = async (request: Request) => {
    let headers: { [key: string]: string } = {
      ...this.defaultHeaders(),
    };

    if (request.type && !request.formBody) {
      headers["Content-Type"] = request.type;
    }

    if (request.headers) {
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });
    }

    const body = request.body;
    const params = request.params;
    const url = request.url;
    const method = request.method;

    const urlWithParams = params
      ? `${url}?${new URLSearchParams(params)}`
      : url;

    /* console.log(
      `Fetch Request: ${urlWithParams} ${method} ${JSON.stringify(
        headers
      )} ${JSON.stringify(body)}`
    );*/

    try {
      const response = await fetch(urlWithParams, {
        method: method,
        credentials: "include",
        headers: headers,

        body: request.formBody || JSON.stringify(body), // Make sure to stringify the body if it's not FormData
      });

      /*  console.log(
        `Fetch Response: ${response.status} ${
          response.statusText
        } ${JSON.stringify(response.headers)}`
      );*/

      this.handleCommonResponse(
        response,
        request.successCallback,
        request.failedCallback
      );
    } catch (e) {
      console.error("Fetch error:", e);
      request.failedCallback(
        400,
        e instanceof Error ? e.message : "Connection Error"
      );
    }
  };

  handleCommonResponse = async (
    response: Response,
    onSuccess: (json: any) => void,
    onFailed: (code: number, msg?: string) => void
  ) => {
    if (response.status === 401) {
      cookieManager.updateCookie(COOKIE_TOKEN, "", 1);
      cookieManager.updateCookie(COOKIE_REFRESH, "", 1);
      loginStore.initStatus();
      onFailed(response.status, await response.text());
      if (window.location.pathname !== "/login") {
        window.history.pushState({}, "", "/login");
        alert("로그인이 필요합니다.");
        window.location.reload();
      }
      return;
    }

    if (response.status === 200) {
      if (response.headers.get("content-type") !== "application/json") {
        onSuccess(await response.text());
        return;
      }
      const json = await response.json();
      if (json.access_token) {
        console.log("update token : ", json.access_token);
        cookieManager.updateCookie(COOKIE_TOKEN, json.access_token, 1);
      }
      if (json.refresh_token) {
        console.log("update refresh token");
        cookieManager.updateCookie(COOKIE_REFRESH, json.refresh_token, 1);
      }

      onSuccess(json);
    } else {
      onFailed(response.status, await response.text());
    }
  };
}

export const remote = new RemoteSource();
