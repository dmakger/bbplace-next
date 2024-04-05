import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { TO_CHAT_ICON } from "../../data/toChat.data.icon";

interface ToChatIconProps{
    className?: string,
}

export const ToChatIcon:FC<ToChatIconProps> = ({className}) => {
    return (
        <ImageSmart icon={TO_CHAT_ICON}
                    width={24} height={24} 
                    className={className}/>
    )
}
