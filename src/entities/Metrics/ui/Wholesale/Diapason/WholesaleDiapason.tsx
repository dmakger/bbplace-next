import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WholesaleDiapason.module.scss'
import { IWholesale } from "../../../model/wholesale.metrics.model";
import { PriceCurrency } from "@/shared/ui/PriceCurrency/PriceCurrency";
import { ICurrency } from "../../../model/currency.metrics.model";

interface WholesaleDiapasonProps{
    minWholesale?: IWholesale
    maxWholesale?: IWholesale
    currency?: string | ICurrency
    className?: string,
    classNameText?: string,
}

export const WholesaleDiapason:FC<WholesaleDiapasonProps> = ({minWholesale, maxWholesale, currency, className}) => {

    if (minWholesale === undefined || maxWholesale === undefined)
        return "По запросу"

    return (
        <div className={cls(cl.wholesale, className)}>
            <PriceCurrency price={minWholesale.price} currency={currency}  />
            {minWholesale.price !== maxWholesale.price && (
                <>
                    &nbsp;
                    <span className={cl.line}>{'-'}</span>
                    &nbsp;
                    <PriceCurrency price={maxWholesale.price} currency={currency}  />
                </>
            )}
        </div>
    )
}
