import { cls } from '@/shared/lib/classes.lib';
import cl from './_HeadingToTextTable.module.scss'
import { IHeadingToText } from "@/shared/model/text.model";
import { T } from "@/shared/ui/Translate";
import { HeadingToTextTableItem } from './ui/HeadingToTextTableItem';

interface HeadingToTextTableProps{
    data: IHeadingToText[]
    isShort?: boolean
    className?: string,
    classNameHeadingItem?: string,
}

export const HeadingToTextTable = ({
    data,
    isShort = false,
    className,
    classNameHeadingItem,
}: HeadingToTextTableProps) => {
    const headingTable = data.map(it => it.heading)
    const textTable = data.map(it => it.text)

    return (
        <div className={cls(cl.block, isShort ? cl.short : '', className)}>
            <div className={cl.column}>
                {headingTable.map((heading, index) => (
                    <HeadingToTextTableItem key={index} classNameHeadingItem={classNameHeadingItem} heading={heading}/>
                ))}
            </div>
            <div className={cls(cl.column, cl.right)}>
                {textTable.map((text, index) => (
                    <span className={cls(cl.text, cl.span)} key={index}><T>{text}</T></span>
                ))}
            </div>
        </div>
    )
}
