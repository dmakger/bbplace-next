import { cls } from "@/shared/lib/classes.lib"
import cl from './_HoverWindow.module.scss'
import { IImageSizes } from "@/shared/model/image.model"
import { ImageAPI } from "../../Image/API/ImageAPI"

interface IHoverWindow{
    className?: string,
    text: string,
    image: string,
    imageSizes?: IImageSizes
}

export const HoverWindow = ({
    className,
    text,
    image,
    imageSizes = {
        width: 100,
        height: 100
    }
}:IHoverWindow) => {
    
    return (
        <div className={cls(cl.HoverWindow, className)}>
            <div className={cl.windowContainer}>
                <ImageAPI src={`${image}`} className={cl.image} width={imageSizes?.width} height={imageSizes?.height} />
                <p className={cl.windowText}>
                    {text}
                </p>
            </div>
            <div className={cl.triangle}/>
        </div>
    )
}
