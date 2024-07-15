import { FC } from "react"
import Image from 'next/image'

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageSmart.module.scss'
import { Axis, IIconProps } from "@/shared/model/button.model";
import { IWarningIcon } from "../../Icon/model/icon.model";

interface ImageSmartProps extends IIconProps, Omit<IIconProps, 'icon'> {
    icon: IWarningIcon,
    isPressed?: boolean
}

export const ImageSmart: FC<ImageSmartProps> = ({ 
    icon, axis = Axis.Default, 
    width, height,
    isActive = false, isSuccess = false, isHovered = false, isPressed = false, isDisabled = false, 
    className, classNameImage 
}) => {
    const style = {
        width: `${width !== undefined ? width : 20}px`,
        height: `${height !== undefined ? height : 20}px`,
    }
    return (
        <div style={style} className={cls(cl.block, className)}>

            {/* default */}
            {!isSuccess && !isDisabled && 
                <div className={cls(
                    isActive ? '' : cl.activeWrapper, 
                    isHovered && icon.defaultHovered ? cl.hoveredWrapper : '', 
                    isPressed && icon.defaultPressed ? cl.pressedWrapper : '', 
                    cl.wrapper
                    )}
                >
                    <Image src={icon.default} alt={'default'} style={style} className={cls(isActive ? "" : cl.static, cl.image, cl[axis], icon.defaultHovered ? cl.visible : '', classNameImage)} />
                    {icon.defaultHovered &&
                        <Image src={icon.defaultHovered} alt={'defaultHovered'} style={style} className={cls(cl.image, cl.hover, cl[axis], classNameImage)} />
                    }
                    {icon.defaultPressed &&
                        <Image src={icon.defaultPressed} alt={'defaultPressed'} style={style} className={cls(cl.image, cl.pressed, cl[axis], classNameImage)} />
                    }
                </div>
            }

            {/* active */}
            {icon.active &&
                <div style={style} className={cls(
                    isActive ? cl.activeWrapper : '', 
                    isHovered && icon.activeHovered ? cl.hoveredWrapper : '',
                    isPressed && icon.activePressed ? cl.pressedWrapper : '',  
                    cl.wrapper
                    )}
                >
                    <Image src={icon.active} alt={'active'} style={style} className={cls(isActive ? cl.static : "", cl.image, cl[axis], icon.activeHovered ? cl.visible : '', classNameImage)} />
                    {icon.activeHovered &&
                        <Image src={icon.activeHovered} alt={'activeHovered'} style={style} className={cls(cl.image, cl.hover, cl[axis], classNameImage)} />
                    }
                    {icon.activePressed &&
                        <Image src={icon.activePressed} alt={'activePressed'} style={style} className={cls(cl.image, cl.pressed, cl[axis], classNameImage)} />
                    }
                </div>
            }
            {/* positive */}
            {icon.positive && isSuccess &&
                <div style={style} >
                    <Image src={icon.positive} alt={'positive'} style={style} className={cls(isSuccess ? cl.static : "", cl.image, cl[axis], classNameImage)} />
                </div>
            }

            {/* disabled */}
            {icon.disabled && 
                <div style={style} >
                    <Image src={icon.disabled} alt={'disabled'} style={style} className={cls(isDisabled ? cl.static : '', cl.image, cl[axis], classNameImage)} />
                </div>}
        </div>
    )
}

