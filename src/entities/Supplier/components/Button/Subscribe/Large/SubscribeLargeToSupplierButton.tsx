import { FC, useCallback, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SubscribeLargeToSupplierButton.module.scss'
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { SUBSCRIBE_BLUE_ICON } from "@/shared/ui/Icon/data/subscribe.data.icon";
import { FavouriteType } from "@/entities/Favourite/data/favourite.data";
import { useFavourite } from "@/entities/Favourite/lib/favourite.lib";

interface SubscribeLargeToSupplierButtonProps{
    supplierId: ISupplier['id']
    isSubscribed?: boolean
    isOutline?: boolean
    className?: string,
    classNameIcon?: string,
}

export const SubscribeLargeToSupplierButton:FC<SubscribeLargeToSupplierButtonProps> = ({supplierId, isSubscribed=false, isOutline=false, className, classNameIcon}) => {
    //HOOKS
    const {addFavourite, deleteFavourite, data: {isInFavourite}} = useFavourite({body: {
        objectId: +supplierId,
        objectType: FavouriteType.Supplier
    }})
    
    // STATE
    const [isActive, setIsActive] = useState(isInFavourite === undefined ? false : isInFavourite)

    // EFFECT
    useEffect(() => {
        if (isInFavourite !== undefined && isActive !== isInFavourite)
            setIsActive(isInFavourite)
        else if (isActive !== isSubscribed)
            setIsActive(isSubscribed)
    }, [isSubscribed, isInFavourite])

    // HANDLE
    const handleOnClick = useCallback(() => {
        isActive ? deleteFavourite() : addFavourite()
        setIsActive(prevState => !prevState)
    }, [isActive])
    
    return (
        <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE} active={isActive} 
                beforeImage={SUBSCRIBE_BLUE_ICON} beforeProps={{width: 16, height: 16, className: classNameIcon, classNameImage: cl.image}}
                title={isActive ? 'Вы подписаны' : 'Подписаться'}
                onClick={handleOnClick}
                className={cls(isOutline ? cl.outlineButton : cl.notOutlineButton, cl.button, isActive ? cl.active : '', className)} 
                classNameText={cls(cl.text, isActive ? cl.activeText : '')}/>

    )
}
