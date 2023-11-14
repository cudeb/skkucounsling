import { remote } from "./RemoteSource";

const issueCSRF = async () => {
  remote
    .get("signup/")
    .onSuccess((json: string) => {})
    .onFailed((code: number, msg?: string) => {})
    .send();
};

export { issueCSRF };
