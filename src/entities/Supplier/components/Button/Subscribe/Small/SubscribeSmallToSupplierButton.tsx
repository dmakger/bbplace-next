import { FC, useCallback, useEffect, useState } from "react"
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { SUBSCRIBE_GRAY_ICON } from "@/shared/ui/Icon/data/subscribe.data.icon";
import { useFavourite } from "@/entities/Favourite/lib/favourite.lib";
import { FavouriteType } from "@/entities/Favourite/data/favourite.data";

import cl from './_SubscribeSmallToSupplierButton.module.scss'
import { cls } from "@/shared/lib/classes.lib";

interface SubscribeSmallToSupplierButtonProps{
    supplierId: ISupplier['id']
    isSubscribed?: boolean
    isWide?: boolean
    className?: string,
    classNameIcon?: string,
}

export const SubscribeSmallToSupplierButton:FC<SubscribeSmallToSupplierButtonProps> = ({supplierId, isSubscribed=false, isWide=false, className, classNameIcon}) => {
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
        <Button variant={ButtonVariant.BACKGROUND_GRAY} active={isActive} 
                beforeImage={SUBSCRIBE_GRAY_ICON} beforeProps={{width: 16, height: 16, className: classNameIcon, classNameImage: cl.image}}
                onClick={handleOnClick}
                className={cls(className, isWide ? cl.wideButton : '')} />
    )
}
