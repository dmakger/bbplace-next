import { FC } from "react"

import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";
import { getImage } from "@/shared/lib/image.lib";
import { IListItem } from "@/shared/model/list.model";

interface InputImageSliderTItemProps extends IListItem<string> {}

export const InputImageSliderTItem:FC<InputImageSliderTItemProps> = ({
    item: src,
    ...rest
}) => {
    return (
        <ImageProduction src={getImage(src)} {...rest} />
    )
}
