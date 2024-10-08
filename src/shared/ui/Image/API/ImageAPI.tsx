"use client"

import { FC, useMemo } from "react"
import Image from 'next/image'
import cl from './_ImageAPI.module.scss'
import { getImage } from "@/shared/lib/image.lib"
import { cls } from "@/shared/lib/classes.lib"
import defaultImageJPG from '@/shared/assets/img/defaultUserGray.svg'


interface ImageAPIProps {
    src: string
    toImage?: boolean
    alt?: string
    width?: number | string
    height?: number | string
    fill?: boolean
    priority?: boolean
    quality?: number
    onClick?: Function
    classNameWrapper?: string,
    className?: string,
}

export const ImageAPI: FC<ImageAPIProps> = ({ 
    src, alt, 
    width, height, fill=true, 
    priority=true, quality=80,
    toImage=true,
    onClick, 
    classNameWrapper, className, 
}) => {
    // MEMO
    const image = useMemo(() => {
        return src ? (toImage ? getImage(src) : src) : defaultImageJPG 
    }, [src, toImage])

    // HANDLE
    const handleOnClickImage = () => {
        if (onClick) onClick()
    }

    const imageHTML = (
        <Image loader={() => src}
            unoptimized={true}
            onClick={handleOnClickImage}
            src={image}
            priority={priority}
            alt={alt ? alt : src}
            width={fill ? undefined : (typeof width === 'string' ? parseInt(width) : width) ?? 100}
            height={fill ? undefined : (typeof height === 'string' ? parseInt(height) : height) ?? undefined}
            quality={quality ? quality : 60}
            // layout={layout}
            fill={fill}
            className={cls(cl.image, className)}>
        </Image>
    )

    if (fill && (width || height)) {
        return (
            <div style={{width, height}} className={cls(cl.wrapperImage, classNameWrapper)}>
                {imageHTML}
            </div>
        )
    }
    return imageHTML
}
