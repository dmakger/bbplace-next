import { FC } from "react"
import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart"
import { ARROW_ICON } from "../../data/arrow.data.icon"
import { IIcon } from "../../model/model"
import { IIconProps } from "@/shared/model/button.model"

interface ArrowIconProps extends IIconProps {}

export const ArrowIcon:FC<ArrowIconProps> = ({icon=ARROW_ICON, width=16, height=16, ...rest}) => {
    return (
        <ImageSmart icon={icon} width={width} height={height} {...rest}/>
    )
}
