import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WholesaleDiapason.module.scss'
import { IWholesale } from "../../../model/wholesale.metrics.model";
import { PriceCurrency } from "@/shared/ui/PriceCurrency/PriceCurrency";
import { ICurrency } from "../../../model/currency.metrics.model";

interface WholesaleDiapasonProps{
    minWholesale?: IWholesale
    maxWholesale?: IWholesale
    currency?: ICurrency
    className?: string,
    classNameText?: string,
    classNameUnit?: string
}

export const WholesaleDiapason:FC<WholesaleDiapasonProps> = ({minWholesale, maxWholesale, currency, className, classNameText, classNameUnit}) => {

    if (minWholesale === undefined || maxWholesale === undefined)
        return <span className={classNameText}>По запросу</span>

    return (
        <div className={cls(cl.wholesale, className)}>
            <PriceCurrency price={minWholesale.price} currency={currency} classNameText={classNameText} />
            {minWholesale.price !== maxWholesale.price && (
                <>
                    &nbsp;
                    <span className={cls(cl.line, classNameText)}>{'-'}</span>
                    &nbsp;
                    <PriceCurrency price={maxWholesale.price} currency={currency} classNameText={classNameText} />
                </>
            )}
            <span className={classNameUnit}>&nbsp;/{minWholesale.metrics?.shortName}.</span>
        </div>
    )
}
