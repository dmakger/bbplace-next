import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperDropdownList.module.scss'
import { ReactNode } from "react"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "../model/wrapperDropdownList.model"

interface IWrapperDropdownList {
    className?: string,
    classNameVisible?: string,
    children: ReactNode,
    isVisible: boolean,
    dropDownListPosition?: EWrapperDropdownListPosition
    variant?: EWrapperDropdownListVariant
}

export const WrapperDropdownList = ({
    className,
    classNameVisible,
    children,
    isVisible,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT,
    variant = EWrapperDropdownListVariant.DESKTOP
}: IWrapperDropdownList) => {
    return (
        <div className={cls(cl.WrapperDropdownList, cl[variant], variant === EWrapperDropdownListVariant.MOBILE && dropDownListPosition === EWrapperDropdownListPosition.RIGHT ? cl.rightMobile : cl[dropDownListPosition], isVisible ? (cls(cl.visible, classNameVisible)) : '', className)}>
            {children}
        </div>
    )
}
