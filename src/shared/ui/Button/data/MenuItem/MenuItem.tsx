import { cls } from "@/shared/lib/classes.lib"
import cl from './_MenuItem.module.scss'
import { Button, ButtonVariant } from "../.."
import { IIconProps } from "@/shared/model/button.model"
import { IIcon } from "@/shared/ui/Icon/model/icon.model"
import { ButtonColor } from "../../model/button.model"

interface IMenuItem {
    className?: string,
    href?: string,
    active?: boolean,
    disabled?: boolean,
    title?: string,
    beforeImage?: IIcon,
    beforeProps?: IIconProps,
    onClick?: Function
}

export const MenuItem = ({
    className,
    title,
    href,
    active,
    disabled,
    beforeImage,
    beforeProps = { width: 18, height: 18 },
    onClick
}: IMenuItem) => {
    return (
        <Button
            variant={ButtonVariant.CLEAR}
            color={ButtonColor.Tertiary}
            href={href}
            active={active}
            disabled={disabled}
            className={cls(cl.MenuItem, active ? cl.active : '', className)}
            title={title}
            beforeImage={beforeImage}
            beforeProps={beforeProps}
            onClick={onClick} />
    )
}
