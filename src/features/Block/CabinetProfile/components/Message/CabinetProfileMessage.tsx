import { cls } from "@/shared/lib/classes.lib"
import cl from './_CabinetProfileMessage.module.scss'

interface ICabinetProfileMessage {
    className?: string,
    text: string
}

export const CabinetProfileMessage = ({
    className,
    text
}: ICabinetProfileMessage) => {
    return (
        <div className={cls(cl.CabinetProfileMessage, className)}>
            <p>{text}</p>
        </div>
    )
}
