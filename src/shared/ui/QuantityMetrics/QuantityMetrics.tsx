import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_QuantityMetrics.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";

interface QuantityMetricsProps{
    quantity: IWholesale['quantity']
    metrics?: IWholesale['metrics']

    className?: string,
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({quantity, metrics, className}) => {
    return (
        <div className={cls(className)}>
            <span className={cl.quantity}>{quantity}</span>
            {metrics && 
                <>
                    &nbsp;
                    <span className={cl.metrics}>{metrics?.shortName}</span>
                </>
            }
        </div>
    )
}
