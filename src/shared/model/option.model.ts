import { TParams } from "./params.model"

/**
 * @param type - необходим для памяти из какой сущности было переведено в [Option] 
 */
export interface IOption {
    id: number
    name: string
    value?: string | number
    params?: TParams
    options?: IOption[]
    type?: OptionType
}


export enum OptionType {
    Any,
    File,
}
