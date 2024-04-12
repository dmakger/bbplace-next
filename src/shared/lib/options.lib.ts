import { IOption } from "../model/option.model";
import { ITranslate } from "../model/translate.model";
import { useTranslate } from "../ui/Translate";

export const isOptionsValueString = (option: IOption) =>  option && ((typeof(option.value) === 'string') ? option.value : option.name);


export const translateOptions = (translateArray: ITranslate[], options: IOption[], language: string): string[] => {
    const translatedOptions: string[] = []
    options.map(it => {
        const translatedOption: string | undefined = useTranslate(translateArray, isOptionsValueString(it), language)
        if (translatedOption && !translatedOptions.includes(translatedOption))
            translatedOptions.push(translatedOption)
    })
    return translatedOptions;
}