import { FC } from "react"

import { ImageSmart } from "@/shared/ui/Image/Smart/ImageSmart";
import { LIST_VIEW_ICON } from "../../data/listView.data.icon";
import { IIconProps } from "@/shared/model/button.model";

interface ListViewIconProps extends IIconProps {}

export const ListViewIcon:FC<ListViewIconProps> = ({isActive=false, isHovered=false, width=20, height=20, className, classNameImage}) => {
    return (
        <ImageSmart icon={LIST_VIEW_ICON}
        width={width} height={height} 
        isActive={isActive} isHovered={isHovered}
        className={className} classNameImage={classNameImage}/>
    )
}
