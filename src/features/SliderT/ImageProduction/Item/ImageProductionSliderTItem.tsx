import { FC } from "react"

import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";
import { getImage } from "@/shared/lib/image.lib";
import { IListItem } from "@/shared/model/list.model";

interface ImageProductionSliderTItemProps extends IListItem<string> {}

export const ImageProductionSliderTItem:FC<ImageProductionSliderTItemProps> = ({
    item: src,
    ...rest
}) => {
    return (
        <ImageProduction src={getImage(src)} {...rest} />
    )
}
