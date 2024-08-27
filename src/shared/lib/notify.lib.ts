import { IOption, IOptionWOId } from "../model/option.model";

/**
 * Перевод списка в `text`
 */
export const listToErrorText = (data: IOptionWOId[] | IOption[], beforeText?: string, afterText?: string) => {
    const text = data.map(it => `"${it.name}"`).join(',')
    const before = beforeText ?? "Вы допустили ошибки или не заполнили следующие поля:\n"
    const after = afterText ?? ""
    return `${before} ${text} ${after}`
}