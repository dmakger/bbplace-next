import { IS_DEFAULT_LANG_STRING } from "@/shared/data/menu/lang.menu.data"
import { ITranslate } from "@/shared/model/translate.model"
import { ReactNode } from "react"

export const useTranslate = (translateArray: ITranslate[], word: string | ReactNode, language: string, ) => {
    if(!word) return
    const translate = translateArray.find(it => (
        word === it[IS_DEFAULT_LANG_STRING]
    ))
    if(!translate) return word
    return translate[language]
}