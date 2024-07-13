import { TParams } from "./params.model"

export interface IOption {
    id: number
    name: string
    value?: string | number
    params?: TParams
    options?: IOption[]
}
