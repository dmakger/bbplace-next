'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderMenuRight.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { MESSAGES_ICON } from "@/shared/ui/Icon/data/messages.data.icon"
import { FAVOURITE_TERTIARY_ICON } from "@/shared/ui/Icon/data/favourite.data.icon"
import { UserProfileBadge } from "@/features/User/UserProfileBadge"

interface IHeaderMenuRight {
    className?: string,

}

export const HeaderMenuRight = ({ className }: IHeaderMenuRight) => {
    return (
        <div className={cls(cl.HeaderMenuRight, className)}>
            <Button className={cl.button} variant={ButtonVariant.DEFAULT} beforeImage={MESSAGES_ICON} beforeProps={{ width: 20, height: 20 }} />
            <Button className={cl.button} variant={ButtonVariant.DEFAULT} beforeImage={FAVOURITE_TERTIARY_ICON} beforeProps={{ width: 20, height: 20 }} />
            <UserProfileBadge />
        </div>
    )
}
