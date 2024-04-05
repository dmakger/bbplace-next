import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { HeadingToText } from "../Text/HeadingToText/Line/HeadingToText";

interface QuantityMetricsProps{
    heading: string
    wholesale?: IWholesale
    className?: string,
    classNameText?: string,
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({heading, wholesale, className, classNameText}) => {
    const text = wholesale && wholesale.metrics ? `${wholesale.quantity} ${wholesale.metrics.shortName}` : "Не указано"
    
    return (
        <HeadingToText heading={heading} text={text} 
                        className={className} classNameText={classNameText} />
    )
}
