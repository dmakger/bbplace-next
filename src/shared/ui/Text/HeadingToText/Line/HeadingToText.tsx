import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToText.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";
import { T, useTranslate } from "@/shared/ui/Translate";
import { TRANSLATED_HEADING_TO_TEXT } from "@/shared/data/translate/headingToText.translate.data";

interface HeadingToTextProps{
    heading: IHeadingToText['heading']
    text: IHeadingToText['text']
    hasSpace?: boolean
    className?: string
    classNameHeading?: string
    classNameText?: string,
    language: string
}

export const HeadingToText:FC<HeadingToTextProps> = ({heading, text, hasSpace=true,  className, classNameHeading, classNameText, language}) => {

    const t = useTranslate(TRANSLATED_HEADING_TO_TEXT, heading, language)    
    
    return (
        <div className={cls(cl.block, className)}>
            <span className={cls(cl.heading, classNameHeading)}>{t}:</span>
            {hasSpace &&
                <>&nbsp;</>
            }
            <span className={cls(cl.text, classNameText)}><T>{text}</T></span>
        </div>
    )
}
