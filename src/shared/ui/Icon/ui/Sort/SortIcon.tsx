'use client'

import { FC } from 'react'
import { ImageSmart } from '@/shared/ui/Image/Smart/ImageSmart'
import { IIconProps } from '@/shared/model/button.model'
import { SORT_ICON } from '../../data/sort.data.icon'


interface ISortIcon extends IIconProps {}

export const SortIcon:FC<ISortIcon> = ({isActive=false, isHovered=false, width=16, height=16, className, classNameImage}) => {
    return (
        <ImageSmart icon={SORT_ICON} 
                    width={width} height={height} 
                    isActive={isActive} isHovered={isHovered}
                    className={className} classNameImage={classNameImage}/>
    )
}

