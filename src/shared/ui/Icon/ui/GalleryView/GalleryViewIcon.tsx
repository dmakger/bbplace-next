import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { GALLERY_VIEW_ICON } from "../../data/galleryView.data.icon";
import { IIconProps } from "@/shared/model/button.model";

interface GalleryViewIconProps extends IIconProps {}

export const GalleryViewIcon:FC<GalleryViewIconProps> = ({isActive=false, isHovered=false, width=20, height=20, className, classNameImage}) => {
    return (
        <ImageSmart icon={GALLERY_VIEW_ICON}
                    width={width} height={height} 
                    isActive={isActive} isHovered={isHovered}
                    className={className} classNameImage={classNameImage}/>
    )
}
