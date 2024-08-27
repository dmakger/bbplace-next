import { IOptionWOId } from "@/shared/model/option.model"
import { generateId } from "../generateId.lib"

/**
 * Создание `IOption`
 * @param name - имя, обязательное поле
 * @param data - остальные аргументы
 * @returns 
 */
export const createOption = (data: IOptionWOId) => {
    return {
        id: generateId(),
        ...data,
    }
}
