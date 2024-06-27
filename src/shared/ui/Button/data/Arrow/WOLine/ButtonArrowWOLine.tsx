import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrowWOLine.module.scss'
import { Button, IButton } from "../../../ui/Button";
import { ARROW_WLINE_SECONDARY_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ButtonVariant } from "../../../model/button.model";

interface IButtonArrawWOLine {
    axis?: Axis
    onClick?: IButton['onClick']
    className?: string,
    classNameImage?: string
}

export const ButtonArrowWOLine = ({
    axis,
    onClick,
    className,
    classNameImage
}: IButtonArrawWOLine) => {
    return (
        <Button afterImage={ARROW_WLINE_SECONDARY_ICON} afterProps={{ axis, classNameImage }}
            variant={ButtonVariant.DEFAULT} 
            onClick={onClick}
            className={cls(cl.button, className)}
             />
    )
}
