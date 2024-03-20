import { FC } from "react"
import Image from 'next/image'
import { getImage } from "@/shared/lib/image.lib"

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
               className={className}>

        </Image>
    )
}
