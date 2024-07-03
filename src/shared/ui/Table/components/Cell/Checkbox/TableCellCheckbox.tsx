import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellCheckbox.module.scss'
import { IInputCheckbox, InputCheckbox } from "@/shared/ui/Input/ui/Checkbox/ui/InputCheckbox";

interface TableCellCheckboxProps extends IInputCheckbox {
    
}

export const TableCellCheckbox:FC<TableCellCheckboxProps> = ({...rest}) => {
    return (
        <InputCheckbox {...rest} />
    )
}
