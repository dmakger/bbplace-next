"use client"

import { FC, useEffect, useMemo, useState } from "react"
import Image from 'next/image'
import cl from './_ImageAPI.module.scss'
import { getDefaultImageAPI, getImage, getImageFetch } from "@/shared/lib/image.lib"
import { cls } from "@/shared/lib/classes.lib"
import { IMAGE_API__DEFAULTS, ImageAPIVariants } from "@/shared/data/image.data"


interface ImageAPIProps {
    src: string
    toImage?: boolean
    alt?: string
    width?: number | string
    height?: number | string
    fill?: boolean
    priority?: boolean
    quality?: number
    variantDefault?: ImageAPIVariants
    onClick?: Function
    classNameWrapper?: string,
    className?: string,
}

export const ImageAPI: FC<ImageAPIProps> = ({ 
    src, alt, 
    width, height, fill=true, 
    priority=true, quality=80,
    toImage=true, 
    variantDefault,
    onClick, 
    classNameWrapper, className, 
}) => {
    // STATE
    const [image, setImage] = useState<string>(getDefaultImageAPI(variantDefault));

    // EFFECT
    useEffect(() => {
        const loadImage = async () => {
            // const fetchedImage = src ? (toImage ? await getImageFetch(src) : src) : undefined;
            const fetchedImage = src ? (toImage ? getImage(src) : src) : undefined;
            setImage(prev => getImage(src) ?? prev);
        };
        loadImage();
    }, [src, toImage, variantDefault]);

    // HANDLE
    const handleOnClickImage = () => {
        if (onClick) onClick()
    }

    const imageHTML = (
        <Image 
            // loader={() => src}
            onClick={handleOnClickImage}
            src={image}
            // src={getImage(src)}
            priority={priority}
            alt={alt ? alt : src}
            width={fill ? undefined : (typeof width === 'string' ? parseInt(width) : width) ?? 100}
            height={fill ? undefined : (typeof height === 'string' ? parseInt(height) : height) ?? undefined}
            quality={quality ? quality : 60}
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
