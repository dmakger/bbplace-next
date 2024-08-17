import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ControlSmall.module.scss'
import { Axis } from "@/shared/model/button.model";
import { Button } from "@/shared/ui/Button";
import { ButtonVariant } from "@/shared/ui/Button/model/button.model";
import { ARROW_FLEX__ICON } from "@/shared/ui/Icon/data/arrow/flex.arrow.data";

interface ControlSmallProps {
    axis?: Axis
    onClick?: Function
    disabled?: boolean
    className?: string,
}

export const ControlSmall:FC<ControlSmallProps> = ({axis, onClick, disabled, className}) => {
    return (
        <Button variant={ButtonVariant.DEFAULT}
                beforeImage={ARROW_FLEX__ICON} beforeProps={{axis}}
                disabled={disabled}
                onClick={onClick} 
                className={cls(cl.button, className)} />
    )
}
