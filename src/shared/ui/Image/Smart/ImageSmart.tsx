import { FC } from "react"
import Image from 'next/image'

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSmart.module.scss'
import { IIcon } from "../../Icon/model/model";

interface ImageSmartProps{
    icon: IIcon
    isActive?: boolean
    width?: number
    height?: number
    isHovered?: boolean
    className?: string,
    classNameImage?: string,
}

export const ImageSmart:FC<ImageSmartProps> = ({icon, isActive=false, width, height, isHovered=false, className, classNameImage}) => {
    const style = {
        width: `${width !== undefined ? width : 20}px`,
        height: `${height !== undefined ? height : 20}px`,
    }
    return (
        <div style={style} className={cls(cl.block, className)}>

            {/* default */}
            <div className={cls(isActive ? '' : cl.activeWrapper, isHovered && icon.defaultHovered ? cl.hoveredWrapper : '',  cl.wrapper)}>
                <Image src={icon.default} alt={'default'} className={cls(isActive ? "" : cl.static , cl.image, icon.defaultHovered ? cl.visible : '', classNameImage)}/>
                {icon.defaultHovered &&
                    <Image src={icon.defaultHovered} alt={'defaultHovered'} className={cls(cl.image, cl.hover, classNameImage)}/>
                }
            </div>

            {/* active */}
            {icon.active &&
                <div style={style} className={cls(isActive ? cl.activeWrapper : '', isHovered && icon.activeHovered ? cl.hoveredWrapper : '', cl.wrapper)}>
                    <Image src={icon.active} alt={'active'} className={cls(isActive ? cl.static : "", cl.image, icon.activeHovered ? cl.visible : '',  classNameImage)}/>
                    {icon.activeHovered &&
                        <Image src={icon.activeHovered} alt={'activeHovered'} className={cls(cl.image, cl.hover, classNameImage)}/>
                    }
                </div>            
            }
        </div>
    )
}
