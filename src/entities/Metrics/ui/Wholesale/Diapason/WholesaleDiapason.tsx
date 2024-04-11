import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WholesaleDiapason.module.scss'
import { IWholesale } from "../../../model/wholesale.metrics.model";
import { PriceCurrency } from "@/shared/ui/PriceCurrency/PriceCurrency";
import { ICurrency } from "../../../model/currency.metrics.model";
import { T, useTranslate } from "@/shared/ui/Translate";
import { TRANSLATED_METRICS_SHORT_NAME } from "@/shared/data/translate/metrics.translate.data";
import { TRANSLATED_WHOLESALE } from "@/shared/data/translate/wholeSale.translate.data";

interface WholesaleDiapasonProps{
    minWholesale?: IWholesale
    maxWholesale?: IWholesale
    currency?: ICurrency
    className?: string,
    classNameText?: string,
    language: string
}

export const WholesaleDiapason:FC<WholesaleDiapasonProps> = ({minWholesale, maxWholesale, currency, className, classNameText, language}) => {

    const translatedWholeSale = useTranslate(TRANSLATED_WHOLESALE, 'По запросу', language)    

    if (minWholesale === undefined || maxWholesale === undefined)
        return <span className={classNameText}>{translatedWholeSale}</span>

    const translatedMetric = useTranslate(TRANSLATED_METRICS_SHORT_NAME, minWholesale.metrics?.shortName, language)    

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
            <span className={classNameText}>&nbsp;/{translatedMetric}.</span>
        </div>
    )
}
