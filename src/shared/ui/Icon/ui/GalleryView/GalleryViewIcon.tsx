import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { GALLERY_VIEW_ICON } from "../../data/galleryView.data.icon";

interface GalleryViewIconProps{
    isActive?: boolean
    isHovered?: boolean
    className?: string,
}

export const GalleryViewIcon:FC<GalleryViewIconProps> = ({isActive, isHovered, className}) => {
    return (
        <ImageSmart icon={GALLERY_VIEW_ICON}
                    width={20} height={20} 
                    isActive={isActive} isHovered={isHovered}
                    className={className}/>
    )
}
