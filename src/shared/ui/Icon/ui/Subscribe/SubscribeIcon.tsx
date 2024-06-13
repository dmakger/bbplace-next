'use client'

import { FC } from 'react'
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart'
import { SUBSCRIBE_BLUE_ICON, SUBSCRIBE_GRAY_ICON } from '../../data/subscribe.data.icon'
import { IIconProps } from '@/shared/model/button.model'


interface ISubscribeIcon extends IIconProps {
    isBlack?: boolean
}

export const SubscribeIcon:FC<ISubscribeIcon> = ({isActive=false, isHovered=false, isBlack=false, width=16, height=16, className, classNameImage}) => {
    return (
        <ImageSmart icon={isBlack ? SUBSCRIBE_BLUE_ICON : SUBSCRIBE_GRAY_ICON} 
                    width={width} height={height} 
                    isActive={isActive} isHovered={isHovered}
                    className={className} classNameImage={classNameImage}/>
    )
}

