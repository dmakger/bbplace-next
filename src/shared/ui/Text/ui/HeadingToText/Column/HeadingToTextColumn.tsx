import cl from './_HeadingToTextColumn.module.scss'
import { cls } from '@/shared/lib/classes.lib';
import { IHeadingToText } from "@/shared/model/text.model";

interface IHeadingToTextColumn {
    data: IHeadingToText[]
    isShort?: boolean,
    hasColon?: boolean,
    classNameMain?: string,
    classNameColumn?:string,
    classNameHeadingItem?: string,
    classNameTextItem?: string
}

export const HeadingToTextColumn = ({
    data,
    isShort = false,
    hasColon = true,
    classNameMain,
    classNameColumn,
    classNameHeadingItem,
    classNameTextItem
}: IHeadingToTextColumn) => {
    const headingTable = data.map(it => it.heading)
    const textTable = data.map(it => it.body)
    return (
        <div className={cls(cl.block, isShort ? cl.short : '', classNameMain)}>
            <div className={cls(cl.column, classNameColumn)}>
                {headingTable.map((heading, index) => (
                    <span className={cls(cl.heading, cl.span, classNameHeadingItem)} key={index}>{heading} {hasColon && ':'}</span>
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