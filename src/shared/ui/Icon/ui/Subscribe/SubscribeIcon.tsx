'use client'

import { FC } from 'react'
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart'
import { SUBSCRIBE_ICON } from '../../data/subscribe.data.icon'


interface ISubscribeIcon{
    isActive?: boolean
    isHovered?: boolean
    className?: string
}


export const SubscribeIcon:FC<ISubscribeIcon> = ({isActive=false, isHovered=false, className}) => {
    return (
        <ImageSmart icon={SUBSCRIBE_ICON} 
                    isActive={isActive} isHovered={isHovered} 
                    width={16} height={16} 
                    className={className}/>
    )
}

