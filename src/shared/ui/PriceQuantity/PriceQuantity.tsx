import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PriceQuantity.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { getDiapasonQuantity } from "@/shared/lib/quantity.lib";

interface PriceQuantityProps{
    wholesales: IWholesale[]
    firstStart?: string
    className?: string,
    classNameWholesaleBlock?: string, 
    classNameQuantity?: string,
    classNamePrice?: string
    classNameForEvenNumbered?: string

}

export const PriceQuantity: FC<PriceQuantityProps> = ({
    wholesales,
    firstStart,
    className,
    classNameWholesaleBlock,
    classNamePrice,
    classNameQuantity,
    classNameForEvenNumbered
}) => {
    const quantities = getDiapasonQuantity(wholesales, firstStart)
    
    return (
        <div className={cls(cl.block, className)}>
            {wholesales.length === 0 && (
                <div className={cls(cl.item, cl.one)}>
                    <span className={cl.price}>{"По запросу"}</span>
                </div>
            )}
            {wholesales.map((it, index) => (
                <div className={cls(cl.item, wholesales.length === 1 ? cl.one : '', classNameWholesaleBlock, classNameForEvenNumbered && (index % 2 !== 0 ? classNameForEvenNumbered : ''))} key={index}>
                    <span className={cls(cl.quantity, classNameQuantity)}>{quantities[index]} {it.metrics?.shortName}.</span>
                    <span className={cls(cl.price, classNamePrice)}>{it.price} {it.currency?.code}</span>
                </div>
            ))}
        </div>
    )
}
