import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface ImageSlideProps{
    slide: string
    className?: string,
}

export const ImageSlide:FC<ImageSlideProps> = ({slide, className}) => {
    return (
        <ImageAPI src={slide} />
    )
}
