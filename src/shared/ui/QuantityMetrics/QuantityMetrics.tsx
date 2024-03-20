import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_QuantityMetrics.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";

interface QuantityMetricsProps{
    quantity: IWholesale['quantity']
    metrics?: IMediaProduct['priceUnits']

    className?: string,
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({quantity, metrics, className}) => {
    let _metrics: IMetrics | undefined
    // if (metrics !== undefined && typeof metrics !== "string") {
    //     if (typeof metrics === "number")
    // } 

    
    return (
        <div className={cls(className)}>
            <span className={cl.quantity}>{quantity}</span>
            {_metrics && 
                <>
                    &nbsp;
                    <span className={cl.metrics}>{_metrics?.shortName}</span>
                </>
            }
        </div>
    )
}
