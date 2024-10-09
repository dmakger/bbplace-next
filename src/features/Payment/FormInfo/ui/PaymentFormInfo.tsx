import { cls } from "@/shared/lib/classes.lib"
import cl from './_PaymentFormInfo.module.scss'
import { ETTVariants } from "@/widgets/Pages/Tariffs/model/tariffs.model"
import Image from "next/image"
import CardBackgroundImage from '@/shared/assets/img/Background/Payment/CardBackgroundImage.svg'
import { IOption } from "@/shared/model/option.model"

export interface IPaymentFormInfo {
    className?: string,
    title?: string,
    mainText: string,
    footerText: string
    tariffsType?: IOption
}

export const PaymentFormInfo = ({
    className,
    title,
    mainText,
    footerText,
    tariffsType
}: IPaymentFormInfo) => {
    return (
        <div className={cls(cl.PaymentFormInfo, tariffsType?.value === ETTVariants.BUSINESS ? cl.business : cl.premium, className)}>
            <div className={cl.info}>
                <span className={cl.title}>{title}</span>
                <h5 className={cl.mainText}>{mainText}</h5>
                <p className={cl.footerText}>{footerText}</p>
            </div>
            <Image src={CardBackgroundImage} alt={"card"} className={cl.backgroundImage} />
        </div>
    )
}
