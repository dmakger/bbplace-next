import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKProductTableCellToggleWCheckbox.module.scss'
import { IGroupProducts } from "@/entities/Product/model/group.product.model";
import { LKProductTableCellCheckbox } from "../Checkbox/LKProductTableCellCheckbox";
import { TableCellToggle } from "@/shared/ui/Table/components/Cell/Toggle/TableCellToggle";

interface LKProductTableCellToggleWCheckboxProps{
    groupProducts: IGroupProducts
    checked?: boolean
    isShow?: boolean
    onClickCheckbox?: Function,
    onClickToggle?: Function,
    className?: string,
}

export const LKProductTableCellToggleWCheckbox:FC<LKProductTableCellToggleWCheckboxProps> = ({groupProducts, checked=false, isShow=false, onClickCheckbox, onClickToggle, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            <LKProductTableCellCheckbox product={groupProducts.main} checked={checked} onClick={onClickCheckbox} className={cl.checkbox}/>
            {groupProducts.rest.length > 0 && (
                <TableCellToggle isShow={isShow} amount={groupProducts.rest.length} onClick={onClickToggle} />  
            )}
        </div>
    )
}
