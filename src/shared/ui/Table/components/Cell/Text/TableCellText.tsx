import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellText.module.scss'

interface TableCellTextProps {
    text: string
    className?: string,
}

export const TableCellText:FC<TableCellTextProps> = ({text, className}) => {
    return (
        <span className={cls(cl.cell, className)}>
            {text}
        </span>
    )
}
