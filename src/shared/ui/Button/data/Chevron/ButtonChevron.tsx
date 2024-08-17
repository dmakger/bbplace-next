import cl from './_ButtonChevron.module.scss'
import { Button, ButtonVariant } from "../.."
import { ButtonSize } from "../../model/button.model"
import { CHEVRON_PRIMARY_ICON } from "@/shared/ui/Icon/data/chevron.data.icon"
import { IImageSizes } from "@/shared/model/image.model"
import { cls } from "@/shared/lib/classes.lib"

interface IButtonChevron {
    className?: string,
    title?: string
    imageSizes?: IImageSizes,
    onClick?: Function
}

export const ButtonChevron = ({
    className,
    title,
    imageSizes = {width: 15, height: 15},
    onClick
}: IButtonChevron) => {
    return (
        <Button
            className={cls(cl.button, className)}
            title={title}
            variant={ButtonVariant.TONAL}
            size={ButtonSize.Medium}
            afterImage={CHEVRON_PRIMARY_ICON}
            afterProps={{classNameImage: cl.image, width: imageSizes.width, height: imageSizes.height}}
            onClick={onClick}
        />
    )
}
