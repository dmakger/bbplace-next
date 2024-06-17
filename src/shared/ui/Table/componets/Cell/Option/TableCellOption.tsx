import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellOption.module.scss'
import { OptionT, OptionTProps } from "@/shared/ui/Option/ui/this/OptionT";

interface TableCellOptionProps extends OptionTProps {
    classNameCell?: string
}

export const TableCellOption:FC<TableCellOptionProps> = ({classNameCell, className, ...rest}) => {
    return (
        <td className={cls(cl.cell, classNameCell)}>
            <OptionT className={cls(cl.data, className)} {...rest}/>
        </td>
    )
}

