import { FC } from "react"

import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";
import { HeadingToText } from "../Text/HeadingToText/Line/HeadingToText";

interface QuantityMetricsProps{
    heading: string
    wholesale?: IWholesale
    className?: string,
    classNameText?: string,
    language: string
}

export const QuantityMetrics:FC<QuantityMetricsProps> = ({heading, wholesale, className, classNameText, language}) => {
    const text = wholesale && wholesale.metrics ? `${wholesale.quantity} ${wholesale.metrics.shortName}` : "Не указано"
    
    return (
        <HeadingToText heading={heading} text={text} 
                        className={className} classNameText={classNameText} language={language}/>
    )
}
