'use client'

import { FC } from 'react'
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart'
import { SUBSCRIBE_BLACK_ICON, SUBSCRIBE_GRAY_ICON } from '../../data/subscribe.data.icon'


interface ISubscribeIcon{
    isActive?: boolean
    isHovered?: boolean
    isBlack?: boolean
    className?: string
}


export const SubscribeIcon:FC<ISubscribeIcon> = ({isActive=false, isHovered=false, isBlack=false, className}) => {
    return (
        <ImageSmart icon={isBlack ? SUBSCRIBE_BLACK_ICON : SUBSCRIBE_GRAY_ICON} 
                    isActive={isActive} isHovered={isHovered} 
                    width={16} height={16} 
                    className={className}/>
    )
}

