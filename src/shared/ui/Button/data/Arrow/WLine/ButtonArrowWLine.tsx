import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrowWLine.module.scss'
import { Button, IButton } from "../../../ui/Button";
import { ARROW_WLINE_SECONDARY_ICON, ARROW_WLINE_TERTIARY_GRAY_ICON, ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ButtonVariant } from "../../../model/button.model";
import { IImageSizes } from "@/shared/model/image.model";

interface ButtonArrowWLineProps extends IButton {
    isSecondary?: boolean
    axis?: Axis
    sizes?: IImageSizes,
    onClick?: IButton['onClick']
    className?: string,
}

export const ButtonArrowWLine:FC<ButtonArrowWLineProps> = ({isSecondary=true, axis, onClick, sizes, className, ...rest}) => {
    return (
        <Button afterImage={isSecondary ? ARROW_WLINE_SECONDARY_ICON : ARROW_WLINE_TERTIARY_GRAY_ICON} afterProps={{axis, width: sizes?.width, height: sizes?.height}} 
                variant={ButtonVariant.DEFAULT} onClick={onClick}
                className={cls(cl.button, className)} {...rest}/>
    )
}
