import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonArrowWOLine.module.scss'
import { Button, IButton } from "../../../ui/Button";
import { ARROW_SECONDARY_WO_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";
import { Axis } from "@/shared/model/button.model";
import { ButtonVariant } from "../../../model/button.model";

interface IButtonArrowWOLine {
    axis?: Axis
    onClick?: IButton['onClick']
    className?: string,
    classNameImage?: string
}

export const ButtonArrowWOLine = ({
    axis = Axis.Default,
    onClick,
    className,
    classNameImage
}: IButtonArrowWOLine) => {
    return (
        <Button
            afterImage={ARROW_SECONDARY_WO_ICON}
            afterProps={{ 
            axis,
            width: 14, height: 9, 
            className: axis === Axis.Default ? cl.default : axis === Axis.Top ? cl.active : '',
             classNameImage }}
            variant={ButtonVariant.DEFAULT}
            onClick={onClick}
            className={cls(cl.button, className)}
        />
    )
}
