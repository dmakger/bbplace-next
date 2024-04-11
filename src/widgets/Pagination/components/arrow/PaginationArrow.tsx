import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PaginationArrow.module.scss'
import { ArrowIcon } from "@/shared/ui/Icon/ui/Arrow/ArrowIcon";
import { ARROW_GRAY_WO_ICON, ARROW_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";

interface PaginationArrowProps{
    disabled?: boolean
    className?: string,
    classNameImage?: string,
}

export const PaginationArrow:FC<PaginationArrowProps> = ({disabled=false, className, classNameImage}) => {
    return (
        <button disabled={disabled} className={cls(cl.button, disabled ? cl.disabled : '', className)}>
            <ArrowIcon icon={disabled ? ARROW_GRAY_WO_ICON : ARROW_WO_ICON} 
                        width={14} height={14} 
                        className={cls(classNameImage, cl.image)} />
        </button>
    )
}
