import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrowWLine.module.scss'
import { Button, IButton } from "../../../ui/Button";
import { ARROW_WLINE_SECONDARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ButtonVariant } from "../../../model/button.model";

interface ButtonArrowWLineProps {
    axis?: Axis
    onClick?: IButton['onClick']
    className?: string,
}

export const ButtonArrowWLine:FC<ButtonArrowWLineProps> = ({axis, onClick, className}) => {
    return (
        <Button afterImage={ARROW_WLINE_SECONDARY_ICON} afterProps={{axis}} 
                variant={ButtonVariant.DEFAULT} onClick={onClick}
                className={cls(cl.button, className)}/>
    )
}
