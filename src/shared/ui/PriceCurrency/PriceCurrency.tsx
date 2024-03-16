import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PriceCurrency.module.scss'
import { getPrice } from "@/shared/lib/price.lib";
import { getCurrency } from "@/entities/Metrics/lib/currency.metrics.lib";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";

interface PriceCurrencyProps{
    price: number
    currency?: string | ICurrency
    className?: string,
}

export const PriceCurrency:FC<PriceCurrencyProps> = ({price, currency, className}) => {
    return (
        <span className={cls(cl.block, className)}>
            <span className={cl.price}>{getPrice(price)}</span>
            {currency && (
                <>
                    &nbsp;
                    <span className={cl.currency}>
                        {getCurrency(typeof currency === "string" ? currency : currency.code)}
                    </span>
                </>
            )}
        </span>
    )
}
