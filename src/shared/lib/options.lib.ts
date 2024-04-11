import { IOption } from "../model/option.model";
import { ITranslate } from "../model/translate.model";
import { useTranslate } from "../ui/Translate";

export const isOptionsValueString = (option: IOption) =>  option && ((typeof(option.value) === 'string') ? option.value : option.name ? option.name : '');


export const translateOptions = (translateArray: ITranslate[], options: IOption[], language: string) => {
    const translatedOptions: string[] = []
    options.map(it => {
        const translatedOption = useTranslate(translateArray, isOptionsValueString(it), language)
        if(!translatedOptions.includes(translatedOption ? translatedOption : ''))            
        translatedOptions.push(translatedOption? translatedOption : '')             
    })
    return translatedOptions;   
}