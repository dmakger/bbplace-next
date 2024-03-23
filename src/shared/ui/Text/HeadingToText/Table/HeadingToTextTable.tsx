import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToTextTable.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";
import { HeadingToText } from "../Line/HeadingToText";

interface HeadingToTextTableProps{
    data: IHeadingToText[]
    isShort?: boolean
    className?: string,
    classNameHeadingItem?: string,
}

export const HeadingToTextTable:FC<HeadingToTextTableProps> = ({data, isShort=false, className, classNameHeadingItem}) => {
    const headingTable = data.map(it => it.heading)
    const textTable = data.map(it => it.text)
    return (
        <div className={cls(cl.block, isShort ? cl.short : '', className)}>
            <div className={cl.column}>
                {headingTable.map(heading => (
                    <span className={cls(cl.heading, cl.span, classNameHeadingItem)}>{heading} :</span>
                ))}
            </div>
            <div className={cls(cl.column, cl.right)}>
                {textTable.map(text => (
                    <span className={cls(cl.text, cl.span)}>{text}</span>
                ))}
            </div>
        </div>
    )
}
