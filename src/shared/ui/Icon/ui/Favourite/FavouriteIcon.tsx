'use client'

import { FC } from 'react';
import { FAVOURITE_ICON } from '../../data/favourite.data.icon';
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart';

interface IFavouriteIcon{
    isActive?: boolean
    isHovered?: boolean
    className?: string
    classNameImage?: string
}

export const FavouriteIcon:FC<IFavouriteIcon> = ({isActive=false, isHovered=false, className = '', classNameImage}) => {
    return (
        <ImageSmart icon={FAVOURITE_ICON} 
                    isActive={isActive} isHovered={isHovered} 
                    width={18} height={18} 
                    className={className} classNameImage={classNameImage}/>
    )
}

