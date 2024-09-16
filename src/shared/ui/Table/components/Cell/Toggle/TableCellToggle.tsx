import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellToggle.module.scss'
import { Button } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model";
import { Axis } from "@/shared/model/button.model";
import { CHEVRON_SECONDARY__ICON } from "@/shared/ui/Icon/data/chevron.data.icon";

interface TableCellToggleProps{
    isShow: boolean
    amount: number
    onClick?: Function
    className?: string,
}

export const TableCellToggle:FC<TableCellToggleProps> = ({isShow, amount, onClick, className}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            <span className={cl.text}>+{amount}</span>
            <div className={cl.many}>
                <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Secondary} size={ButtonSize.Medium} 
                        afterImage={CHEVRON_SECONDARY__ICON} afterProps={{axis: isShow ? Axis.Top : Axis.Bottom}}
                        onClick={onClick} className={cl.button} />
            </div>
        </div>
    )
}
