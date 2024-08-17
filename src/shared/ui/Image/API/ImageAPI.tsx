"use client"

import { FC, useMemo } from "react"
import Image from 'next/image'
import cl from './_ImageAPI.module.scss'
import { getImage } from "@/shared/lib/image.lib"
import { cls } from "@/shared/lib/classes.lib"
import defaultImageJPG from '@/shared/assets/img/default-image.jpg'


interface ImageAPIProps {
    src: string
    toImage?: boolean
    alt?: string
    width?: number
    height?: number
    priority?: boolean
    quality?: number
    className?: string,
}

export const ImageAPI: FC<ImageAPIProps> = ({ src, toImage=true, alt, width = 40, height = 40, priority = true, quality=80, className }) => {
    // MEMO
    const image = useMemo(() => {
        return src ? (toImage ? getImage(src) : src) : defaultImageJPG 
    }, [src, toImage])

    return (
        <Image loader={() => src}
            unoptimized={true}
            // src={src ? getImage(src) : defaultImageJPG}
            src={image}
            priority={priority}
            alt={alt ? alt : src}
            width={width ?? 100}
            height={height ?? 100}
            quality={quality < 1 || quality > 100 ? 80 : quality}
            // layout="responsive"
            className={cls(cl.image, className)}>
        </Image>
    )
}
