import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperDropdown.module.scss'
import { ReactNode } from "react"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "../model/wrapperDropdownList.model"

interface IWrapperDropdownList {
    className?: string,
    children: ReactNode,
    isVisible: boolean,
    dropDownListPosition?: EWrapperDropdownListPosition
    variant?: EWrapperDropdownListVariant

}

export const WrapperDropdownList = ({
    className,
    children,
    isVisible,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT,
    variant = EWrapperDropdownListVariant.DESKTOP
}: IWrapperDropdownList) => {
    return (
        <div className={cls(cl.WrapperDropdownList, cl[variant], cl[dropDownListPosition], isVisible ? cl.visible : '', className)}>
            {children}
        </div>
    )
}
