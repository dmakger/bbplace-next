import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToText.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";
import { T } from "@/shared/ui/Translate";

interface HeadingToTextProps{
    heading: IHeadingToText['heading']
    text: IHeadingToText['text']
    hasSpace?: boolean
    className?: string
    classNameHeading?: string
    classNameText?: string
}

export const HeadingToText:FC<HeadingToTextProps> = ({heading, text, hasSpace=true,  className, classNameHeading, classNameText}) => {
    return (
        <div className={cls(cl.block, className)}>
            <span className={cls(cl.heading, classNameHeading)}><T>{heading}</T>:</span>
            {hasSpace &&
                <>&nbsp;</>
            }
            <span className={cls(cl.text, classNameText)}><T>{text}</T></span>
        </div>
    )
}
