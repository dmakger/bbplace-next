import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TableCellMany.module.scss'
import { Button } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model";
import { ARROW_WLINE_SECONDARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";

interface TableCellManyProps{
    isShow: boolean
    onClick?: Function
    className?: string,
}

export const TableCellMany:FC<TableCellManyProps> = ({isShow, onClick, className}) => {
    return (
        <div className={cls(className)}>
            <div className={cl.many}>
                <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Secondary} size={ButtonSize.Medium} 
                        afterImage={ARROW_WLINE_SECONDARY_ICON} afterProps={{axis: isShow ? Axis.Top : Axis.Bottom}}
                        onClick={onClick} />
            </div>
        </div>
    )
}
