import Image from 'next/image'

import defaultImageJPG from '@/shared/assets/img/default-image.jpg'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_User.module.scss'
import { MouseEventHandler } from 'react'

interface UserProps {
    image?: string
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
}

export const User = ({ image, className, onClick }: UserProps) => {
    return (
        <Image src={image ? image : defaultImageJPG} alt={'Avatar'} className={cls(cl.image, className)} onClick={onClick} priority/>
    )
}
