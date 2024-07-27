'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_ButtonLink.module.scss'
import { Button, ButtonVariant } from "../.."
import { ButtonColor } from "../../model/button.model"
import { usePathname } from "next/navigation"
import { ENotificationVariants } from "@/shared/ui/Notification/model/notification.model"

interface IButtonLink {
    className?: string,
    title?: string,
    href?: string,

}

export const ButtonLink = ({ 
    className,
    title,
    href = ' '
 }: IButtonLink) => {

    //ROUTER
    const pathname = usePathname()

    return (
        <Button 
            title={title}
            variant={ButtonVariant.LINK}
            color={ButtonColor.Tertiary}
            className={cls(cl.linkButton, pathname.includes(href) ? cl.active : '')}
            href={href}
            notificationVariant={ENotificationVariants.COUNTER}
        />
    )
}
