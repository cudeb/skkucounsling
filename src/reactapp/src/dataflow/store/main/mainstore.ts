import { makeAutoObservable } from "mobx";

interface IMainStore {
    flag: boolean;
}

class MainStore implements IMainStore {
    constructor(){
        makeAutoObservable(this)
    }
    flag: boolean = false;
    setFlag(flag: boolean) {
        this.flag = flag;
    }
    getFlag() {
        return this.flag;
    }
}

export type { IMainStore }
export { MainStore }