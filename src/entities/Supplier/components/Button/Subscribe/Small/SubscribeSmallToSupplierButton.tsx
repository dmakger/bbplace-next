import { FC, useState } from "react"
import { SubscribeIcon } from "@/shared/ui/Icon";

import cl from './_SubscribeSmallToSupplierButton.module.scss'
import { cls } from "@/shared/lib/classes.lib";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";

interface SubscribeSmallToSupplierButtonProps{
    supplierId: ISupplier['id']
    isSubscribed?: boolean
    isWide?: boolean
    className?: string,
    classNameIcon?: string,
}

export const SubscribeSmallToSupplierButton:FC<SubscribeSmallToSupplierButtonProps> = ({supplierId, isSubscribed=false, isWide=false, className, classNameIcon}) => {
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
        <Button variant={ButtonVariant.BACKGROUND_GRAY} 
                onClick={handleOnClick} 
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave} classNameButton={isWide ? cl.wideButton : ''}>
            <SubscribeIcon isActive={isActive} isHovered={isHovered} className={classNameIcon}/>
        </Button>
    )
}
