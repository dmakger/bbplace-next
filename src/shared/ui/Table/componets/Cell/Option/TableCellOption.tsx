import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellOption.module.scss'
import { OptionT, OptionTProps } from "@/shared/ui/Option/ui/this/OptionT";

interface TableCellOptionProps extends OptionTProps {}

export const TableCellOption:FC<TableCellOptionProps> = ({className, ...rest}) => {
    return (
        <OptionT className={cls(cl.data, className)} {...rest}/>
    )
}

