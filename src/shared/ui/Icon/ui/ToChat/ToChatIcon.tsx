import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { TO_CHAT_ICON } from "../../data/toChat.data.icon";
import { IIconProps } from "@/shared/model/button.model";

interface ToChatIconProps extends IIconProps {}

export const ToChatIcon:FC<ToChatIconProps> = ({isActive=false, isHovered=false, width=24, height=24, className, classNameImage}) => {
    return (
        <ImageSmart icon={TO_CHAT_ICON}
                    width={width} height={height} 
                    isActive={isActive} isHovered={isHovered}
                    className={className} classNameImage={classNameImage}/>
    )
}
