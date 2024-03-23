import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";

interface QuantityMetricsProps{
    wholesale?: IWholesale
    className?: string,
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({wholesale, className}) => {


    if (wholesale === undefined)
        return "Не указано"
    
    return (
        <div className={cls(className)}>
            <span>{wholesale.quantity}</span>
            {wholesale.metrics && 
                <>
                    &nbsp;
                    <span>{wholesale.metrics.shortName}</span>
                </>
            }
        </div>
    )
}
