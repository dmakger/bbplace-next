import { FC, useCallback, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonFavourite.module.scss'
import { Button } from "../../ui/Button";
import { ButtonVariant } from "../../model/button.model";
import { FAVOURITE_ICON, FAVOURITE_NEW_ICON } from "../../../Icon/data/favourite.data.icon";
import { IFavouriteRequest } from "@/entities/Favourite/model/favourite.model";
import { useFavourite } from "@/entities/Favourite/lib/favourite.lib";
import { isAuth } from "@/entities/Auth/lib/auth-token.lib";

export enum ButtonFavouriteVariant {
    Default = 'default',
    New = 'new',
}

export interface ButtonFavouriteProps{
    isFill?: boolean
    isCircled?: boolean,
    isFavourited?: boolean
    variantFavourite?: ButtonFavouriteVariant
    className?: string,
    classNameIcon?: string,
}

export interface ButtonFavouriteWBodyProps extends ButtonFavouriteProps {
    mountIsInFavourite?: boolean
    body?: IFavouriteRequest
}

export const ButtonFavourite:FC<ButtonFavouriteWBodyProps> = ({
    mountIsInFavourite=false, 
    body, 
    
    isFill=false, 
    isFavourited=false, 
    variantFavourite=ButtonFavouriteVariant.Default, 
    className, classNameIcon
}) => {
    //HOOKS
    const {addFavourite, deleteFavourite, data: {isInFavourite}} = useFavourite({mountIsInFavourite, body})  
    
    // STATE
    const [isActive, setIsActive] = useState(isInFavourite === undefined ? false : isInFavourite)

    // EFFECT
    useEffect(() => {
        if (isInFavourite !== undefined && isActive !== isInFavourite)
            setIsActive(isInFavourite)
        else if (isActive !== isFavourited)
            setIsActive(isFavourited)
    }, [isFavourited, isInFavourite])

    // HANDLE
    const handleOnClick = useCallback(() => {
        if (!isAuth())
            return
        isActive ? deleteFavourite() : addFavourite()
        setIsActive(prevState => !prevState)
    }, [isActive])

    // RETURN
    return (
        <Button variant={ButtonVariant.DEFAULT} active={isActive} 
                beforeImage={variantFavourite === ButtonFavouriteVariant.Default ? FAVOURITE_ICON : FAVOURITE_NEW_ICON} 
                beforeProps={{className: classNameIcon, classNameImage: cl.image}}
                onClick={handleOnClick}
                className={cls(cl.button, isFill ? cl.fill : '', isActive ? cl.active : '', className)} />
    )
}
