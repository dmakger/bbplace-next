import Image from 'next/image'

import defaultImageJPG from '@/shared/assets/img/default-image.jpg'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_User.module.scss'
import { MouseEventHandler } from 'react'
import { EUserVariants } from '../model/user.model'
import { ARROW_TERTIARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { ENotificationVariants } from '@/shared/ui/Notification/model/notification.model'
import { Notification } from '@/shared/ui/Notification'
import { getSupplierImage } from '@/entities/Supplier/lib/image.supplier.lib'
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'

interface UserProps {
    image?: string
    variant?: EUserVariants,
    notificationVariant?: ENotificationVariants,
    className?: string,
    classNameArrowContainer?: string
    onClick?: MouseEventHandler
}

export const User = ({
    image,
    variant = EUserVariants.DEFAULT,
    notificationVariant = ENotificationVariants.NONE,
    className,
    classNameArrowContainer,
    onClick
}: UserProps) => {

    return (
        <>
            {variant === EUserVariants.DEFAULT ? (
                <ImageAPI src={getSupplierImage(image)} 
                        width={45} height={45}
                        onClick={onClick} 
                        className={cls(cl.image, className)} />
            ) : (
                <div onClick={onClick} className={cl.userImageContainer}>
                    <ImageAPI src={getSupplierImage(image)} width={45} height={45} className={cls(cl.image, className)} />
                    <div className={cls(cl.arrowContainer, classNameArrowContainer)}>
                        <Image src={ARROW_TERTIARY_WO_ICON.default} alt='' className={cl.arrow} width={8} height={5} />
                    </div>
                    <Notification variant={notificationVariant} />
                </div>
            )}
        </>

    )
}
