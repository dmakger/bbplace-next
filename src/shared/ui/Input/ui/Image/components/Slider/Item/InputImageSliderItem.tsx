import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InputImageSliderItem.module.scss'
import { ISliderItem } from "@/features/Slider/model/slider.model";
import { ImageProduction } from "@/shared/ui/Image/Production/ui/ImageProduction";
import { getImage } from "@/shared/lib/image.lib";

interface InputImageSliderItemProps extends ISliderItem<string> {}

export const InputImageSliderItem:FC<InputImageSliderItemProps> = ({
    slide: src,
    ...rest
}) => {
    return (
        <ImageProduction src={getImage(src)} {...rest} />
    )
}
