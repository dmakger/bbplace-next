import Image from 'next/image'

import defaultImageJPG from '@/shared/assets/img/default-image.jpg'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_User.module.scss'

interface UserProps {
    image?: string
    className?: string
}

export const User = ({image, className}: UserProps) => {
    return (
        <Image src={image ? image : defaultImageJPG} alt={'Avatar'} className={cls(cl.image, className)}  />
    )
}
