import { cls } from "@/shared/lib/classes.lib"
import cl from './_WrapperNotAuthPages.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI"
import Image from "next/image"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { SUPPORT_ICON } from "@/shared/ui/Icon/data/support.data.icon"

interface IWrapperNotAuthPages{
    className?: string,
    pageTitle: string
}

export const WrapperNotAuthPages = ({
    className,
    pageTitle
}: IWrapperNotAuthPages) => {
    return (
        <div className={cls(cl.WrapperNotAuthPages, className)}>
            <Image src='logo.svg' alt="logo" width={120} height={120}/>
            <div className={cl.formContainer}>
                <h4 className={cl.pageTitle}>{pageTitle}</h4>
            </div>
            <div className={cl.buttonsContainer}>
                <Button variant={ButtonVariant.CONTENT}
                color={ButtonColor.Tertiary}
                size={ButtonSize.Medium}>
                    Назад
                </Button>
                <Button variant={ButtonVariant.CONTENT}
                color={ButtonColor.Tertiary}
                beforeImage={SUPPORT_ICON}
                beforeProps={{ width: 18, height: 18, classNameImage: cl.arrowImage }}

                size={ButtonSize.Medium}>
                    Поддержка
                </Button>
            </div>
        </div>
    )
}
