import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperColumnNoGap.module.scss'
import { ReactNode } from "react"

interface IWrapperColumnNoGap{
    className?: string,
    children: ReactNode
}

export const WrapperColumnNoGap = ({
    className,
    children
}: IWrapperColumnNoGap) => {
    return (
        <div className={cls(cl.WrapperDropdown, className)}>
            {children}
        </div>
    )
}
