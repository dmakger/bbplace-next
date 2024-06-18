import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellText.module.scss'

interface TableCellChildrenProps {
    children?: ReactNode
    classNameCell?: string,
}

export const TableCellChildren:FC<TableCellChildrenProps> = ({children, classNameCell}) => {
    return (
        <td className={cls(cl.cell, classNameCell)}>
            {children}
        </td>
    )
}
