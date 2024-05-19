import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonFavourite.module.scss'
import { FavouriteIcon } from "../../Icon";

interface ButtonFavouriteProps{
    isFill?: boolean
    isCircled?: boolean,
    isFavourited?: boolean
    onClick?: Function
    className?: string,
    classNameIcon?: string,
}

export const ButtonFavourite:FC<ButtonFavouriteProps> = ({isFill=false, isCircled = false, isFavourited=false, onClick, className, classNameIcon}) => {
    // STATE
    const [isActive, setIsActive] = useState(isFavourited)
    const [isHovered, setIsHovered] = useState(false)

    // HANDLE
    const handleOnClick = () => {
        if (onClick) onClick()
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
                className={cls(cl.button, isFill ? cl.fill : '', isActive ? cl.active : '', isCircled ? cl.circled : '', className)}>
            <FavouriteIcon isActive={isActive} isHovered={isHovered} 
                           className={classNameIcon} classNameImage={cl.image}/>
        </button>
    )
}
