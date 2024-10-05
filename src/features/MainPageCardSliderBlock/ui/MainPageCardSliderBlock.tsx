import { cls } from "@/shared/lib/classes.lib"
import cl from './_MainPageCardSliderBlock.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { ReactNode } from "react"

export interface IMainPageCardSliderBlock {
    className?: string,
    classNameTitle?: string,
    title: string,
    buttonTitle: string
    buttonHref: string,
    children: ReactNode
}

export const MainPageCardSliderBlock = ({
    className,
    classNameTitle,
    title,
    buttonTitle,
    buttonHref,
    children
}: IMainPageCardSliderBlock) => {
    return (
        <div className={cls(cl.MainPageCardSliderBlock, className)}>
            <div className={cl.topContainer}>
                <h4 className={cls(cl.title, classNameTitle)}>
                    {title}
                </h4>
                <Button
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Secondary}
                    size={ButtonSize.Medium}
                    title={buttonTitle}
                    href={buttonHref}
                    className={cl.button}
                />
            </div>
            {children}
        </div>
    )
}
