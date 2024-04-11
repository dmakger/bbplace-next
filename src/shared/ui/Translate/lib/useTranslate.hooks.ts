import { IS_DEFAULT_LANG_STRING } from "@/shared/data/menu/lang.menu.data"
import { ITranslate } from "@/shared/data/translate.data"

export const useTranslate = (translateArray: ITranslate[], word: string, language: string, ) => {
    if(!word) return
    const translate = translateArray.find(it => (
        word === it[IS_DEFAULT_LANG_STRING]
    ))
    if(!translate) return word
    return translate[language]
}