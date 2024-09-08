import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrowWLine.module.scss'
import { Button, IButton } from "../../../ui/Button";
import { ARROW_WLINE_SECONDARY_ICON, ARROW_WLINE_TERTIARY_GRAY_ICON, ARROW_WLINE_TERTIARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ButtonVariant } from "../../../model/button.model";
import { IImageSizes } from "@/shared/model/image.model";
import { ListDirection } from "@/shared/data/list.data";

interface ButtonArrowWLineProps extends IButton {
    isSecondary?: boolean
    axis?: Axis
    direction?: ListDirection
    sizes?: IImageSizes,
    onClick?: IButton['onClick']
    className?: string,
}

export const ButtonArrowWLine:FC<ButtonArrowWLineProps> = ({
    isSecondary=true, 
    axis, direction=ListDirection.Row,
    onClick, sizes, 
    className, ...rest
}) => {
    return (
        <Button afterImage={isSecondary ? ARROW_WLINE_SECONDARY_ICON : ARROW_WLINE_TERTIARY_GRAY_ICON} afterProps={{axis, width: sizes?.width, height: sizes?.height}} 
                variant={ButtonVariant.DEFAULT} onClick={onClick}
                className={cls(cl.button, cl[direction], className)} {...rest}/>
    )
}
