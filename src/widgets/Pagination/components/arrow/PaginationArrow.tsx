import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PaginationArrow.module.scss'
import { ArrowIcon } from "@/shared/ui/Icon/ui/Arrow/ArrowIcon";
import { ARROW_GRAY_WO_ICON, ARROW_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";

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
        <button disabled={disabled} onClick={handleOnClick} 
                className={cls(cl.button, disabled ? cl.disabled : '', className)}>
            <ArrowIcon icon={disabled ? ARROW_GRAY_WO_ICON : ARROW_WO_ICON} 
                        width={14} height={14} 
                        className={cls(classNameImage, cl.image)} />
        </button>
    )
}
