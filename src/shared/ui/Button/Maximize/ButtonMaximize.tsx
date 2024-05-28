import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonMaximize.module.scss'
import { Button, IButton } from "../ui/Button";
import { ButtonVariant } from "../model/model";
import { MAXIMIZE_SECONDARY_ICON } from "../../Icon/data/maximize.data.icon";

interface ButtonMaximizeProps {
    onClick?: IButton['onClick']
    className?: string,
}

export const ButtonMaximize:FC<ButtonMaximizeProps> = ({onClick, className}) => {
    return (
        <Button afterImage={MAXIMIZE_SECONDARY_ICON}
                variant={ButtonVariant.DEFAULT} onClick={onClick}
                className={cls(cl.button, className)}/>
    )
}
