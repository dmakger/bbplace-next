'use client'

import { FC } from 'react';
import { FAVOURITE_ICON } from '../../data/favourite.data.icon';
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart';
import { IIconProps } from '@/shared/model/button.model';

interface IFavouriteIcon extends IIconProps {}

export const FavouriteIcon:FC<IFavouriteIcon> = ({isActive, isHovered, width=18, height=18, className, classNameImage}) => {
    return (
        <ImageSmart icon={FAVOURITE_ICON} 
                    width={width} height={height} 
                    isActive={isActive} isHovered={isHovered}
                    className={className} classNameImage={classNameImage}/>
    )
}

