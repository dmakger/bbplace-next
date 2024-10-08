import { ENotifyStatus } from "../data/notify.data"
import { IButton } from "@/shared/ui/Button/ui/Button"


export interface INotify extends INotifyBody {
    id: number
}


export interface INotifyBody {
    text?: string
    status?: ENotifyStatus,
    button?: Omit<IButton, 'ref'>[]
}