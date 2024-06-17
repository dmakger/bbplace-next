import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellOption.module.scss'
import { OptionT, OptionTProps } from "@/shared/ui/Option/ui/this/OptionT";

interface TableCellOptionProps extends OptionTProps {
    classNameCell?: string
}

export const TableCellOption:FC<TableCellOptionProps> = ({classNameCell, ...rest}) => {
    return (
        <td className={classNameCell}>
            <OptionT {...rest}/>
        </td>
    )
}

