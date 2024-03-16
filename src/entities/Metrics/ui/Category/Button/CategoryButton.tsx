'use client'

import Image from 'next/image'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_CategoryButton.module.scss'
import CategorySVG from '@/shared/assets/img/category.svg'

interface CategoryButtonProps {
    onClick?: Function
    className?: string
}

export default function CategoryButton({onClick, className}: CategoryButtonProps) {
    const handleOnClick = () => {
        if (onClick) onClick()
    }

    return (
        <button onClick={handleOnClick} className={cls(cl.button, className)}>
            <Image src={CategorySVG} alt='category' width={31} height={31} />
            <span className={cl.title}>Категории</span>
        </button>
    )
}
