import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PriceQuantity.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { getDiapasonQuantity } from "@/shared/lib/quantity.lib";

interface PriceQuantityProps{
    wholesales: IWholesale[]
    firstStart?: string
    className?: string,
}

export const PriceQuantity:FC<PriceQuantityProps> = ({wholesales, firstStart, className}) => {
    const quantities = getDiapasonQuantity(wholesales, firstStart)
    
    return (
        <div className={cls(cl.block, className)}>
            {wholesales.length === 0 && (
                <div className={cls(cl.item, cl.one)}>
                    <span className={cl.price}>{"По запросу"}</span>
                </div>
            )}
            {wholesales.map((it, index) => (
                <div className={cls(cl.item, wholesales.length === 1 ? cl.one : '')} key={index}>
                    <span className={cl.quantity}>{quantities[index]} {it.metrics?.shortName}.</span>
                    <span className={cl.price}>{it.price} {it.currency?.code}</span>
                </div>
            ))}
        </div>
    )
}
