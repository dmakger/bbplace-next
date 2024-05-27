import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageMaximizeSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";

interface ImageMaximizeSlideProps{
    slide: string
    className?: string,
}

export const ImageMaximizeSlide:FC<ImageMaximizeSlideProps> = ({slide, className}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            <ImageAPI src={slide} width={350} height={350} className={cls(cl.image)} />
        </div>
    )
}
