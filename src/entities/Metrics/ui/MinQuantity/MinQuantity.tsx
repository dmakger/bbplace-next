import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_MinQuantity.module.scss'
import { IWholesale } from "../../model/wholesale.metrics.model";

interface MinQuantityProps{
    wholesale: IWholesale[]
    className?: string,
}

export const MinQuantity:FC<MinQuantityProps> = ({wholesale, className}) => {
    // quantity
    // metrics
    return (
        <></>
        // <QuantityMetrics />
    )
}
