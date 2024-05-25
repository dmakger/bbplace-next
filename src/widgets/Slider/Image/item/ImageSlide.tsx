import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSlide.module.scss'
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI";
import Image from "next/image";

interface ImageSlideProps {
    slide: string,
    classNameContainer?: string,
    className?: string,
    width: number,
    height: number,
    isScale?: boolean
}

export const ImageSlide: FC<ImageSlideProps> = ({
    slide,
    className,
    classNameContainer,
    width = 660,
    height = 465,
    isScale = false
}) => {
    return (
        <div className={cls(cl.imageContainer, classNameContainer)}>
            <ImageAPI src={slide} width={width} height={height} className={cls(cl.image, className)} />
            {isScale && <Image src='/imageScale.svg' alt="" className={cl.scaleImage} width={18} height={18}/>}
        </div>
    )
}
