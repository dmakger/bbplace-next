import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SubscribeLargeToSupplierButton.module.scss'
import { SubscribeIcon } from "@/shared/ui/Icon";

interface SubscribeLargeToSupplierButtonProps{
    isSubscribed?: boolean
    isOutline?: boolean
    className?: string,
    classNameIcon?: string,
}

export const SubscribeLargeToSupplierButton:FC<SubscribeLargeToSupplierButtonProps> = ({isSubscribed=false, isOutline=false, className, classNameIcon}) => {
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
                className={cls(isOutline ? cl.outlineButton : cl.notOutlineButton, cl.button, isActive ? cl.active : '', className)}>
            <SubscribeIcon isActive={isActive} isHovered={isHovered} isBlack={true} className={classNameIcon}/>
            <span className={cl.text}>
                {isActive ? 'Вы подписаны' : 'Подписаться'}
            </span>
        </button>
    )
}
