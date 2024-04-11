'use client'
import React, {ReactNode} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'
import Link from 'next/link'
import { ArrowIcon } from '../../Icon/ui/Arrow/ArrowIcon'
import { useTranslate } from '../../Translate'
import { useAppSelector } from '@/storage/hooks'
import { TRANSLATED_BUTTONS } from '@/shared/data/translate/buttons.translate.data'

interface IButton {
    children?: ReactNode
    className?: string
    classNameButton?: string
    classNameText?: string
    type?: "submit" | "button"
    onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
    // onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
    // onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
    onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
    disabled?: boolean
    variant?: ButtonVariant
    noTranslation?: boolean
    loading?: boolean
    href?: string
}

export const Button = ({ children,
    className = '',
    classNameButton = '',
    classNameText = '',
    type = "submit",
    onClick = () => { },
    onMouseEnter = () => { },
    onMouseLeave = () => { },
    disabled = false,
    loading = false,
    variant = ButtonVariant.BORDERED_RED_WIDE,
    href,
}: IButton) => {

    const language = useAppSelector(state => state.translate.language)

    // ===={ HANDLES }====
    const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e) onClick(e)
    }

    const handleOnMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        if (e) onMouseEnter(e)
    }

    const handleOnMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        if (e) onMouseLeave(e)
    }

    // ===={ PROPS }====
    const props = {
        type: type,
        onClick: handleOnClick,
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        disabled: disabled || loading, 
        className: `${cl.button} ${cl[variant]} ${classNameButton}`,
    }

    const t = useTranslate(TRANSLATED_BUTTONS, children, language)

    // ===={ BODY HTML }====
    const bodyHTML = (
        <>
            {!loading && children &&
                <span className={`${cl.buttonText} ${cl[classNameText]}`}>
                    {t}
                </span>
            }
            {variant === ButtonVariant.W_ARROW_RED &&
                <ArrowIcon  />
            }
        </>
    )
    
    // ========================
    return (
        <div className={`global ${cl.wrapper} ${className}`}>
            {href ? (
                <Link href={href} {...props}>
                    {bodyHTML}
                </Link>
            ) : (
                <button {...props}>
                    {bodyHTML}
                </button>
            )}
        </div>
    )
}

Button.Variant = ButtonVariant;

