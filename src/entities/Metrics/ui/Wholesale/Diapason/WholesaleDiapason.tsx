import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WholesaleDiapason.module.scss'
import { IWholesale } from "../../../model/wholesale.metrics.model";
import { PriceCurrency } from "@/shared/ui/PriceCurrency/PriceCurrency";
import { ICurrency } from "../../../model/currency.metrics.model";
import { T } from "@/shared/ui/Translate";

interface WholesaleDiapasonProps{
    minWholesale?: IWholesale
    maxWholesale?: IWholesale
    currency?: ICurrency
    className?: string,
    classNameText?: string,
}

export const WholesaleDiapason:FC<WholesaleDiapasonProps> = ({minWholesale, maxWholesale, currency, className, classNameText}) => {

    if (minWholesale === undefined || maxWholesale === undefined)
        return <span className={classNameText}><T>По запросу</T></span>

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
            <span className={classNameText}>&nbsp;/<T>{minWholesale.metrics?.shortName}</T>.</span>
        </div>
    )
}
