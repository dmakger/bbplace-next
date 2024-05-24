import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PaginationArrow.module.scss'
import { ARROW_GRAY_WO_ICON, ARROW_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Button, ButtonVariant } from "@/shared/ui/Button";

interface PaginationArrowProps{
    disabled?: boolean
    onClick?: Function
    className?: string,
    classNameImage?: string,
}

export const PaginationArrow:FC<PaginationArrowProps> = ({disabled=false, onClick, className, classNameImage}) => {
    const handleOnClick = () => {
        if (onClick && !disabled)
            onClick()
    } 

    return (
        <Button variant={ButtonVariant.DEFAULT} disabled={disabled} 
                beforeImage={disabled ? ARROW_GRAY_WO_ICON : ARROW_WO_ICON} beforeProps={{width: 14, height: 14, className: classNameImage}}
                onClick={handleOnClick} 
                className={cls(cl.button, disabled ? cl.disabled : '', className)}/>
    )
}
