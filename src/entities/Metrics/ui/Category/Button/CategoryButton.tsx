'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_CategoryButton.module.scss'

import { Button, ButtonVariant } from '@/shared/ui/Button'
import { CATEGORY_ICON } from '@/shared/ui/Icon/data/category.data.icon'

interface CategoryButtonProps {
    onClick?: Function
    className?: string,
    isMobile?: boolean
}

export const CategoryButton = ({ onClick, className, isMobile = false }: CategoryButtonProps) => {
    // HANDLE
    const handleOnClick = () => {
        if (onClick) onClick()
    }

    return (
        <Button
            className={cls(cl.button, isMobile ? cl.mobileButton : '', className)}
            variant={ButtonVariant.DEFAULT}
            title={isMobile ? '' : 'Категории'}
            classNameText={cl.title}
            beforeImage={CATEGORY_ICON}
            beforeProps={{ width: 31, height: 31 }}
            onClick={handleOnClick}
        />
    )
}
