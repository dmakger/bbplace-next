import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableCellCheckbox.module.scss'
import { IInputCheckbox } from "@/shared/ui/Input/ui/Checkbox/ui/InputCheckbox";
import { IProduct } from "@/entities/Product/model/product.model";
import TableCell from "@/shared/ui/Table/components/Cell";
import { IInput } from "@/shared/ui/Input/model/input.model";

interface LKProductTableCellCheckboxProps extends IInput{
    product: IProduct,
    checked?: boolean
    onClick?: Function
    classNameInput?: string
}

export const LKProductTableCellCheckbox:FC<LKProductTableCellCheckboxProps> = ({product, checked, onClick, classNameInput, className, ...rest}) => {
    
    // HANDLE
    const onClickCheckbox: IInputCheckbox['onClick'] = (value) => {
        if (onClick)
            onClick(product, value)
    }
    
    return (
        <div className={cls(cl.block, className)}>
            <TableCell.Checkbox onClick={onClickCheckbox} checked={checked} className={classNameInput} {...rest}/>
        </div>
    )
}
