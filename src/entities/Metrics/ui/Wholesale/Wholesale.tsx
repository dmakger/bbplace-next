import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Wholesale.module.scss'
import { IWholesale } from "../../model/wholesale.metrics.model";
import { getPrice } from "@/shared/lib/price.lib";
import { getCurrency } from "../../lib/currency.metrics.lib";
import { IProduct } from "@/entities/Product/model/product.model";
import { PriceCurrency } from "@/shared/ui/PriceCurrency/PriceCurrency";
import { ICurrency } from "../../model/currency.metrics.model";

interface WholesaleProps{
    wholesales: IWholesale[]
    currency?: string | ICurrency
    className?: string,
    classNameText?: string,
}

export const Wholesale:FC<WholesaleProps> = ({wholesales, currency, className}) => {
    const prices = wholesales.map(it => it.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const _currency = wholesales.length > 0 && wholesales[0].currency !== undefined 
                    ? wholesales[0].currency
                    : currency 

    if (wholesales.length === 0)
        return "По запросу"

    return (
        <div className={cls(className)}>
            <PriceCurrency price={minPrice} currency={_currency}  />
            {maxPrice !== minPrice && (
                <>
                    <span className={cl.line}>{'-'}</span>
                    <PriceCurrency price={minPrice} currency={_currency}  />
                </>
            )}
        </div>
    )
}
