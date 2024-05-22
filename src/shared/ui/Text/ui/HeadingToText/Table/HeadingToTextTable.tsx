import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToTextTable.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";

interface HeadingToTextTableProps{
    data: IHeadingToText[]
    isShort?: boolean
    className?: string,
    classNameColumn?: string,
    classNameHeadingItem?: string,
    classNameTextItem?: string,
}

export const HeadingToTextTable:FC<HeadingToTextTableProps> = ({data, isShort=false, className, classNameColumn, classNameHeadingItem, classNameTextItem}) => {
    const headingTable = data.map(it => it.heading)
    const textTable = data.map(it => it.text)
    return (
        <div className={cls(cl.block, isShort ? cl.short : '', className)}>
            <div className={cls(cl.column, classNameColumn)}>
                {headingTable.map((heading, index) => (
                    <span className={cls(cl.heading, cl.span, classNameHeadingItem)} key={index}>{heading} :</span>
                ))}
            </div>
            <div className={cls(cl.column, cl.right, classNameColumn)}>
                {textTable.map((text, index) => (
                    <span className={cls(cl.text, cl.span, classNameTextItem)} key={index}>{text}</span>
                ))}
            </div>
        </div>
    )
}
