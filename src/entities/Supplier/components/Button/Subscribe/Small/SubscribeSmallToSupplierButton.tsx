import { FC, useState } from "react"
import { SubscribeIcon } from "@/shared/ui/Icon";

import cl from './_SubscribeSmallToSupplierButton.module.scss'

interface SubscribeSmallToSupplierButtonProps{
    isSubscribed?: boolean
    className?: string,
}

export const SubscribeSmallToSupplierButton:FC<SubscribeSmallToSupplierButtonProps> = ({isSubscribed=false, className}) => {
    // STATE
    const [isActive, setIsSubscribed] = useState(isSubscribed)
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnClick = () => {
        setIsSubscribed(prevState => !prevState)
    }

    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
    }
    
    
    return (
        <button onClick={handleOnClick} 
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                className={cl.button}>
            <SubscribeIcon isActive={isActive} isHovered={isHovered} className={className}/>
        </button>
    )
}
