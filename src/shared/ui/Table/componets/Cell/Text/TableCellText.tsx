import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellText.module.scss'

interface TableCellTextProps {
    text: string
    className?: string,
    classNameCell?: string,
}

export const TableCellText:FC<TableCellTextProps> = ({text, className, classNameCell}) => {
    return (
        <td className={cls(cl.cell, classNameCell)}>
            {text}
        </td>
    )
}
