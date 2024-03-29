import { FC, useState } from "react"
import { SubscribeIcon } from "@/shared/ui/Icon";

import cl from './_SubscribeSmallToSupplierButton.module.scss'
import { cls } from "@/shared/lib/classes.lib";

interface SubscribeSmallToSupplierButtonProps{
    isSubscribed?: boolean
    isWide?: boolean
    className?: string,
    classNameIcon?: string,
}

export const SubscribeSmallToSupplierButton:FC<SubscribeSmallToSupplierButtonProps> = ({isSubscribed=false, isWide=false, className, classNameIcon}) => {
    // STATE
    const [isActive, setIsActive] = useState(isSubscribed)
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnClick = () => {
        setIsActive(prevState => !prevState)
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
                className={cls(isWide ? cl.wideButton : '', cl.button, className)}>
            <SubscribeIcon isActive={isActive} isHovered={isHovered} className={classNameIcon}/>
        </button>
    )
}
