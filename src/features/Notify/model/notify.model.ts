import { ENotifyStatus } from "../data/notify.data"


export interface INotify extends INotifyBody {
    id: number
}


export interface INotifyBody {
    text: string
    status: ENotifyStatus
}