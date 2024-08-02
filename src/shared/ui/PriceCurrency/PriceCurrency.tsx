import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PriceCurrency.module.scss'
import { getPrice } from "@/shared/lib/price.lib";
import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";

interface PriceCurrencyProps{
    price: number
    currency?: string | ICurrency
    className?: string,
    classNameText?: string,
}

export const PriceCurrency:FC<PriceCurrencyProps> = ({price, currency, className, classNameText}) => {
    return (
        <span className={cls(cl.block, className)}>
            <span className={cls(cl.price, classNameText)}>{getPrice(price)}</span>
            {currency && (
                <>
                    &nbsp;
                    <span className={cls(cl.currency, classNameText)}>
                        {/* {getSymbolByCodeCurrency(typeof currency === "string" ? currency : currency.code)} */}
                        {typeof currency === "string" ? currency : currency.code}
                    </span>
                </>
            )}
        </span>
    )
}
