import { FC } from "react"

import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { HeadingToTextLine } from "../Text";


interface QuantityMetricsProps{
    heading: string
    wholesale?: IWholesale
    className?: string,
    classNameText?: string,
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({heading, wholesale, className, classNameText}) => {
    const text = wholesale && wholesale.metrics ? `${wholesale.quantity} ${wholesale.metrics.shortName}` : "Не указано"
    
    return (
        <HeadingToTextLine heading={heading} text={text} 
                        classNameRow={className} classNameText={classNameText} />
    )
}
