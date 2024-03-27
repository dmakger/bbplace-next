import { FC } from "react"
import { SubscribeIcon } from "@/shared/ui/Icon";

interface SubscribeToSupplierButtonProps{
    isSubscribed: boolean
    className?: string,
}

export const SubscribeToSupplierButton:FC<SubscribeToSupplierButtonProps> = ({isSubscribed, className}) => {
    return (
        <SubscribeIcon _isSubscribed={isSubscribed} className={className}/>
    )
}
