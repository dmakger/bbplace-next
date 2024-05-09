import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PriceQuantity.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";

interface PriceQuantityProps{
    wholesales: IWholesale[]
    className?: string,
}

export const PriceQuantity:FC<PriceQuantityProps> = ({wholesales, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            {wholesales.map((it, index) => (
                <div className={cls(cl.item)} key={index}>
                    <span className={cl.quantity}>{it.quantity}</span>
                    <span className={cl.price}>{it.price}</span>
                </div>
            ))}
        </div>
    )
}
