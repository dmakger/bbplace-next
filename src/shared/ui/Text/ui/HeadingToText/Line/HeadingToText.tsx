import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToText.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";

interface HeadingToTextProps{
    data?: IHeadingToText[],
    heading?: IHeadingToText['heading']
    text?: IHeadingToText['text']
    hasSpace?: boolean
    className?: string
    classNameHeading?: string
    classNameText?: string
}

export const HeadingToText:FC<HeadingToTextProps> = ({data, hasSpace=true,  className, classNameHeading, classNameText}) => {

    const headingTable = data && data.map(it => it.heading)
    const textTable = data && data.map(it => it.text)
    return (
        <div className={cls(cl.block, className)}>
        {headingTable && headingTable.map(it => (
                <span className={cls(cl.heading, classNameHeading)}>{it}:</span>
            ))
        }
            
            {hasSpace &&
                <>&nbsp;</>
            }

            {textTable && textTable.map(it => (
                <span className={cls(cl.text, classNameText)}>{it}</span>
            ))}
        </div>
    )
}
