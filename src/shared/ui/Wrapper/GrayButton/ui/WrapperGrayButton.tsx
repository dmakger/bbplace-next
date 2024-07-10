import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperGrayButton.module.scss'
import { ReactNode } from "react"

interface IWrapperGrayButton{
    className?: string,
    classNameLabel?: string,
    children: ReactNode
    labelText?: string
}

export const WrapperGrayButton = ({
    className,
    classNameLabel,
    children,
    labelText
}: IWrapperGrayButton) => {
    return (
        <div className={cls(cl.WrapperGrayButton, className)}>
            <label className={cls(cl.label, classNameLabel)}>
                {labelText}
            </label>
            {children}
        </div>
    )
}
