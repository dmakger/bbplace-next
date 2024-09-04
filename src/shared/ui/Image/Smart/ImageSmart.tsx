"use client"

import { FC, useMemo } from "react"
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
    width, height, alt='',
    isActive = false, isSuccess = false, isHovered = false, isPressed = false, isDisabled = false, isLoading = false,
    className, classNameImage 
}) => {
    // MEMO
    const props = useMemo(() => (
        {
            width: width !== undefined ? width : 20,
            height: height !== undefined ? height : 20,
        }
    ), [width, height])

    const style = useMemo(() => (
        {
            width: `${props.width}px`,
            height: `${props.height}px`,
        }
    ), [props])

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
                    <Image src={icon.default} alt={`${alt} default`} {...props} className={cls(isActive ? "" : cl.static, cl.image, cl[axis], icon.defaultHovered ? cl.visible : '', classNameImage)} />
                    {icon.defaultHovered &&
                        <Image src={icon.defaultHovered} alt={`${alt} defaultHovered`} {...props} className={cls(cl.image, cl.hover, cl[axis], classNameImage)} />
                    }
                    {icon.defaultPressed &&
                        <Image src={icon.defaultPressed} alt={`${alt} defaultPressed`} {...props} className={cls(cl.image, cl.pressed, cl[axis], classNameImage)} />
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
                    <Image src={icon.active} alt={`${alt} active`} {...props} className={cls(isActive ? cl.static : "", cl.image, cl[axis], icon.activeHovered ? cl.visible : '', classNameImage)} />
                    {icon.activeHovered &&
                        <Image src={icon.activeHovered} alt={`${alt} activeHovered`} {...props} className={cls(cl.image, cl.hover, cl[axis], classNameImage)} />
                    }
                    {icon.activePressed &&
                        <Image src={icon.activePressed} alt={`${alt} activePressed`} {...props} className={cls(cl.image, cl.pressed, cl[axis], classNameImage)} />
                    }
                </div>
            }
            {/* positive */}
            {icon.positive && isSuccess &&
                <div style={style} >
                    <Image src={icon.positive} alt={`${alt} positive`} {...props} className={cls(isSuccess ? cl.static : "", cl.image, cl[axis], classNameImage)} />
                </div>
            }

            {/* disabled */}
            {icon.disabled && 
                <div style={style} >
                    <Image src={icon.disabled} alt={`${alt} disabled`} {...props} className={cls(isDisabled ? cl.static : '', cl.image, cl[axis], classNameImage)} />
                </div>
            }

            {/* loading */}
            {icon.loading && 
                <div style={style}>
                    <Image src={icon.loading} alt={`${alt} loading`} {...props} className={cls(isLoading ? cl.static : '', cl.image, cl[axis], classNameImage)} />
                </div>
            }
        </div>
    )
}

