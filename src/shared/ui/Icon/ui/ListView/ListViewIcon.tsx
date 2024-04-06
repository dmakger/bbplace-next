import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { LIST_VIEW_ICON } from "../../data/listView.data.icon";

interface ListViewIconProps{
    isActive?: boolean
    isHovered?: boolean
    className?: string,
}

export const ListViewIcon:FC<ListViewIconProps> = ({isActive, isHovered, className}) => {
    return (
        <ImageSmart icon={LIST_VIEW_ICON}
                    width={20} height={20} 
                    isActive={isActive} isHovered={isHovered}
                    className={className}/>
    )
}
