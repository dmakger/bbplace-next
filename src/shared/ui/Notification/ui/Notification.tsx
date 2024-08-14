import { cls } from "@/shared/lib/classes.lib"
import cl from './_Notification.module.scss'
import { ENotificationVariants } from "../model/notification.model"

interface INotification{
    className?: string,
    variant?: ENotificationVariants

}

export const Notification = ({
    className,
    variant = ENotificationVariants.ONLINE
}: INotification) => {
    return (
        <div className={cls(cl.Notification, cl[variant], className)}>
            {variant === ENotificationVariants.COUNTER && <span>N</span>}
        </div>
    )
}
