import Image from 'next/image'

import defaultImageJPG from '@/shared/assets/img/default-image.jpg'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_User.module.scss'
import { MouseEventHandler } from 'react'
import { EUserVariants } from '../model/user.model'
import { ARROW_TERTIARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { Notification } from '@/shared/ui/Notification/ui/Notification'

interface UserProps {
    image?: string
    variant?: EUserVariants,
    isNotification?: boolean,
    className?: string,
    classNameArrowContainer?: string
    onClick?: MouseEventHandler
}

export const User = ({
    image,
    variant = EUserVariants.DEFAULT,
    isNotification = false,
    className,
    classNameArrowContainer,
    onClick
}: UserProps) => {
    return (
        <>
            {variant === EUserVariants.DEFAULT ?
                <Image src={image ? image : defaultImageJPG}
                    alt={'Avatar'}
                    className={cls(cl.image, className)}
                    onClick={onClick}
                    priority /> :

                <button onClick={onClick} className={cl.button}>
                    <Image src={image ? image : defaultImageJPG}
                        className={cls(cl.image, className)}
                        alt={'Avatar'} />
                    <div className={cls(cl.arrowContainer, classNameArrowContainer)}>
                        <Image src={ARROW_TERTIARY_WO_ICON.default} alt='' className={cl.arrow} width={8} height={5} />
                    </div>
                    {isNotification && <Notification/>
}
                </button>}
        </>

    )
}
