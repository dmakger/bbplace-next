import { cls } from "@/shared/lib/classes.lib"
import cl from './_MainPageCardSliderBlock.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"

export interface IMainPageCardSliderBlock {
    className?: string,
    title: string,
    buttonTitle: string
    buttonHref: string
}

export const MainPageCardSliderBlock = ({
    className,
    title,
    buttonTitle,
    buttonHref
}: IMainPageCardSliderBlock) => {
    return (
        <div className={cls(cl.MainPageCardSliderBlock, className)}>
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
        </div>
    )
}
