import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageAD.module.scss'
import { ImageAPI } from "../API/ImageAPI";

interface ImageADProps {
    src: string
    isActive?: boolean
    className?: string,
    classNameImage?: string,
}

export const ImageAD:FC<ImageADProps> = ({src, isActive=false, className, classNameImage}) => {
    return (
        <div className={cls(cl.wrapper, isActive ? cl.active : '', className)}>
            <ImageAPI src={src} className={cls(cl.image, classNameImage)} />
        </div>
    )
}
