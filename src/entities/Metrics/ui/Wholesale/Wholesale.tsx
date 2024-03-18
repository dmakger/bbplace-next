import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_Wholesale.module.scss'
import { IWholesale } from "../../model/wholesale.metrics.model";
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
        <div className={cls(cl.wholesale, className)}>
            <PriceCurrency price={minPrice} currency={_currency}  />
            {maxPrice !== minPrice && (
                <>
                    &nbsp;
                    <span className={cl.line}>{'-'}</span>
                    &nbsp;
                    <PriceCurrency price={maxPrice} currency={_currency}  />
                </>
            )}
        </div>
    )
}
