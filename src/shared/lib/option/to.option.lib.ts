import { IOption } from "@/shared/model/option.model";

/**
 * Перевод `IOption` в тип который указываешь при вызове функции  
 * 
 * ```ts
 * // Пример вызова 
 * fromOptionToType<ICurrency>(option)
 * ```
 */
export const fromOptionToType = <T>(opt: IOption): T => {
    const {id, name, params} = opt
    return {id, name, ...params} as T
}