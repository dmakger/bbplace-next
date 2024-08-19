'use client'

import cl from './_Logo.module.scss'
import { LOGO_ICON, LOGO_INCLINED_ICON } from '../../Icon/data/logo.data.icon';
import { IImageSizes } from '@/shared/model/image.model';
import { Button, ButtonVariant } from '../../Button';
import { ELogoVariants } from '../model/logo.model';
import { cls } from '@/shared/lib/classes.lib';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SuspenseL from '../../Wrapper/SuspenseL/SuspenseL';

interface ILogo {
    className?: string,
    variant?: ELogoVariants
    sizes?: IImageSizes,
    title?: string
}

export const Logo = ({...rest}: ILogo) => {
    return (
        <SuspenseL>
            <LogoChild {...rest} />
        </SuspenseL>
    )
}


const LogoChild = ({
    className,
    variant = ELogoVariants.DEFAULT,
    sizes = { width: 50, height: 50 },
    title
}: ILogo) => {

    // STATE
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isPressed, setIsPressed] = useState<boolean>(false)

    // ROUTE
    const pathname = usePathname()

    // FUNCTIONS
    const handleOnMouseEnter = () => {
        setIsHovered(true)
    }
    const handleOnMouseLeave = () => {
        setIsHovered(false)
        setIsPressed(false)
    }

    const handleOnMouseDown = () => {
        setIsPressed(true)
        setIsHovered(true)
    }
    const handleOnMouseUp = () => {
        setIsPressed(false)
        setIsHovered(true)
    }


    return (
        <>

            {variant === ELogoVariants.DEFAULT ? <Button href='/'
                variant={ButtonVariant.DEFAULT}
                className={className}
                beforeImage={LOGO_ICON}
                beforeProps={{ width: sizes.width, height: sizes.height }}
            /> :
                <div 
                    className={cls(cl.newLogo, pathname === '/' ? cl.active : '')}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    onMouseDown={handleOnMouseDown}
                    onMouseUp={handleOnMouseUp}>
                        
                    <Button
                        href='/'
                        pressed={isPressed}
                        hovered={isHovered}
                        active={pathname === '/'}
                        className={cls(cl.bbIcon, className)}
                        beforeImage={LOGO_INCLINED_ICON}
                        beforeProps={{ width: sizes.width, height: sizes.height }}
                    />
                    <Button
                        href='/'
                        className={cls(cl.logoButton, className)}
                        variant={ButtonVariant.CLEAR}
                        title={title}
                    />
                </div>

            }
        </>

    )
}
