import { FC } from "react"
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart"
import { ARROW_ICON } from "../../data/arrow.data.icon"

interface ArrowIconProps{
    className?: string,
}

export const ArrowIcon:FC<ArrowIconProps> = ({className}) => {
    return (
        <ImageSmart icon={ARROW_ICON} 
                    width={16} height={16} 
                    className={className}/>
    )
}
