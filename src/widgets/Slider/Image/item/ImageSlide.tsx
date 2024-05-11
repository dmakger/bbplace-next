import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface ImageSlideProps {
    slide: string
    className?: string,
    width: number,
    height: number
}

export const ImageSlide: FC<ImageSlideProps> = ({
    slide,
    className,
    width = 660,
    height = 465
}) => {
    return (
        <ImageAPI src={slide} width={width} height={height} className={cls(cl.image, className)} />
    )
}
