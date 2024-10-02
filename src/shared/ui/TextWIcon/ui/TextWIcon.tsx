import { cls } from "@/shared/lib/classes.lib"
import cl from './_TextWIcon.module.scss'
import { IIcon } from "../../Icon/model/icon.model"
import { IImageSizes } from "@/shared/model/image.model"
import { ImageSmart } from "../../Image/Smart/ImageSmart"

export interface ITextWIcon {
    className?: string,
    classNameText?: string,
    icon: IIcon,
    iconSizes?: IImageSizes,
    alt?: string,
    text: string
}

export const TextWIcon = ({
    className,
    classNameText,
    icon,
    iconSizes,
    alt,
    text,

}: ITextWIcon) => {
    return (
        <>
            {text && <div className={cls(cl.TextWIcon, className)}>
                <ImageSmart icon={icon}
                    alt={alt}
                    width={iconSizes?.width}
                    height={iconSizes?.height}
                />
                <p className={classNameText}>
                    {text}
                </p>
            </div>}
        </>
    )
}
