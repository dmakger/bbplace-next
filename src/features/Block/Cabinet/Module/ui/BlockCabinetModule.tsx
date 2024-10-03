import { cls } from "@/shared/lib/classes.lib"
import cl from './_BlockCabinetModule.module.scss'
import { CabinetModuleStatisticsText, ICabinetModuleStatisticsText } from "../components/CabinetModuleStatisticsText"
import { ReactNode } from "react"
import { Button } from "@/shared/ui/Button"
import { ButtonVariant } from "@/shared/ui/Button/model/button.model"

export interface IBlockCabinetModule {
    className?: string,
    title: string,
    titleQuantity?: string,
    href?: string,
    mainBlockText?: string,
    statisticsTextArray?: ICabinetModuleStatisticsText[]
    headerButton?: ReactNode,
    disabled?: boolean
}

export const BlockCabinetModule = ({
    className,
    title,
    titleQuantity,
    href,
    mainBlockText,
    statisticsTextArray,
    headerButton,
    disabled
}: IBlockCabinetModule) => {
    return (
        <div className={cls(cl.BlockCabinetModule, disabled ? cl.disabled : '', cl[className ?? ''])}>
            <div className={cl.header}>
                <div className={cl.leftContainer}>
                    <Button
                        href={href}
                        title={title}
                        variant={ButtonVariant.DEFAULT}
                        className={cl.buttonTitle}
                        afterText={titleQuantity}
                        classNameAfterText={cl.quantity}
                    />
                </div>
                {headerButton && <div className={cl.button}>{headerButton}</div>}
            </div>
            <div className={cl.mainBlock}>
                {mainBlockText && <p>{mainBlockText}</p>}
                {statisticsTextArray?.map(it => (
                    <CabinetModuleStatisticsText key={it.title} title={it.title} quantity={it.quantity} />
                ))}
            </div>
        </div>
    )
}
