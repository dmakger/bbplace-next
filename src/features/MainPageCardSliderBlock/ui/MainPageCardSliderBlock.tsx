import { cls } from "@/shared/lib/classes.lib"
import cl from './_MainPageCardSliderBlock.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { CardsProductSlider } from "../components/Product/CardsProductSlider"
import { ISliderT } from "@/shared/model/sliderT.model"
import { ReactNode } from "react"

export interface IMainPageCardSliderBlock {
    // sliderComponent: React.FC<ISliderT<T>>,
    className?: string,
    title: string,
    buttonTitle: string
    buttonHref: string,
    children: ReactNode
}

export const MainPageCardSliderBlock = <T extends any>({
    // sliderComponent,
    className,
    title,
    buttonTitle,
    buttonHref,
    children
}: IMainPageCardSliderBlock) => {
    return (
        <div className={cls(cl.MainPageCardSliderBlock)}>
            <div className={cl.topContainer}>
                <h4 className={cl.title}>
                    {title}
                </h4>
                <Button
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Secondary}
                    size={ButtonSize.Medium}
                    title={buttonTitle}
                    href={buttonHref}
                />
            </div>
            {children}
        </div>
    )
}
