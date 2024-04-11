import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeadingToTextTableItem.module.scss'
import { useTranslate } from "@/shared/ui/Translate"
import { useAppSelector } from "@/storage/hooks"
import { TRANSLATED_HEADING_TO_TEXT } from "@/shared/data/translate/headingToText.translate.data"

interface IHeadingToTextTableItem{
    heading: string,
    classNameHeadingItem?: string,
}

export const HeadingToTextTableItem = ({
    classNameHeadingItem,
    heading
}: IHeadingToTextTableItem) => {

    const languager = useAppSelector(state => state.translate.language)

    const t = useTranslate(TRANSLATED_HEADING_TO_TEXT, heading, languager)

    return (
        <span className={cls(cl.heading, cl.span, classNameHeadingItem)}>{t}</span>
    )
}
