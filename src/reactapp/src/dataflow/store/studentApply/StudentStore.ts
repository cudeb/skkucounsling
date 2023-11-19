import { IPreferFields } from './../../interface/counseling';
import { remote } from "../../remote/RemoteSource";
import { IApplicationForm } from "../../interface/counseling";
import { makeAutoObservable  } from "mobx";
import { toJS } from 'mobx';
class StudentStore {
  application!: IApplicationForm;
  applicationExist: number = -1;
  constructor() {
    makeAutoObservable(this);
  }

  fetchApplication = () => {
    remote
      .get("counseling/application-student/")
      .onSuccess((json: any) => {
        console.log("fetch success");
        const applicationsArray= json.counseling_applications ;
        
       if(applicationsArray.length===0){
          this.applicationExist=0;
       }
       else{
        this.application=applicationsArray[0];
        for (const a of applicationsArray){
          if(this.application.applied_at<a.applied_at){
            this.application=a;
          }
        }
        this.application.applied_at = this.application.applied_at.split("T")[0];
        this.applicationExist = 1;
       }
      })
      .onFailed((code: number, msg?: string) => {
        console.log("fetch failed");
        this.applicationExist = -1;
      })
      .send();
  };
}

export const studentStore = new StudentStore();