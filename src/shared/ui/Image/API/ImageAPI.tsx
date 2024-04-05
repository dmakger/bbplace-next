import { FC } from "react"
import Image from 'next/image'
import cl from './_ImageAPI.module.scss'
import { getImage } from "@/shared/lib/image.lib"
import { cls } from "@/shared/lib/classes.lib"

interface ImageAPIProps{
    src: string
    alt?: string
    width?: number
    height?: number
    priority?: boolean
    className?: string,
}

export const ImageAPI:FC<ImageAPIProps> = ({src, alt, width, height, priority=true, className}) => {
    return (
        <Image loader={() => src}
               unoptimized={true}
               src={getImage(src)} 
               priority={priority}
               alt={alt ? alt : src}
               width={width ? width : 100}
               height={height ? height : 100}
               className={cls(cl.image, className)}>

        </Image>
    )
}
