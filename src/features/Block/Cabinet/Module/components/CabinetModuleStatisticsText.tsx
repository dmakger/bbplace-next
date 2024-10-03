import { cls } from "@/shared/lib/classes.lib"
import cl from './_CabinetModuleStatisticsText.module.scss'

export interface ICabinetModuleStatisticsText {
    className?: string,
    title: string,
    quantity: string
}

export const CabinetModuleStatisticsText = ({
    className,
    title,
    quantity
}: ICabinetModuleStatisticsText) => {
    return (
        <p className={cls(cl.CabinetModuleStatisticsText, className)}>
            <span>
                {title}
            </span>
            <span className={cl.quantity}>
                {quantity ?? 'dasd'}
            </span>
        </p>
    )
}
