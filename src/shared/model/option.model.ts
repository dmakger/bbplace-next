import { TParams } from "./params.model"

/**
 * @param type - необходим для памяти из какой сущности было переведено в [Option] 
 */
export interface IOption extends IOptionWOId {
    id: number
}

export interface IOptionWOId {
    name: string
    value?: string | number
    params?: TParams
    options?: IOption[]
    type?: OptionType,
    caption?: string
}

export enum OptionType {
    Any,
    File,
    Currency
}
