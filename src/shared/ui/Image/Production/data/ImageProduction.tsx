import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageProduction.module.scss'
import { ImageAPI } from "../../API/ImageAPI";
import { ImageProductionVariant } from "./production.image.data";

interface ImageADProps {
    src: string
    variant?: ImageProductionVariant
    isActive?: boolean
    className?: string,
    classNameImage?: string,
}

export const ImageProduction:FC<ImageADProps> = ({src, isActive=false, className, classNameImage}) => {
    return (
        <div className={cls(cl.wrapper, isActive ? cl.active : '', className)}>
            <ImageAPI src={src} className={cls(cl.image, classNameImage)} />
        </div>
    )
}
