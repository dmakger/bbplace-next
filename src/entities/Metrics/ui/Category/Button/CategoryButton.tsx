'use client'

import Image from 'next/image'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_CategoryButton.module.scss'
import CategorySVG from '@/shared/assets/img/category.svg'
import { useAppSelector } from '@/storage/hooks'
import { useTranslate } from '@/shared/ui/Translate'
import { TRANSLATED_BUTTONS } from '@/shared/data/translate/buttons.translate.data'

interface CategoryButtonProps {
    onClick?: Function
    className?: string,
    isMobile?: boolean
}

export default function CategoryButton({onClick, className, isMobile = false}: CategoryButtonProps) {
    const handleOnClick = () => {
        if (onClick) onClick()
    }

    const language = useAppSelector(state => state.translate.language)
    const t = useTranslate(TRANSLATED_BUTTONS, 'Категории', language);

    return (
        <button onClick={handleOnClick} className={cls(cl.button, className)}>
            <Image src={CategorySVG} alt='category' width={31} height={31} />
            {!isMobile ?
                <span className={cl.title}>
                    {t}
                </span>
                : null}
        </button>
    )
}
