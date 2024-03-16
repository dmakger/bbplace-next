'use client'
import React, {ReactNode} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'

interface IButton {
    children: ReactNode
    className?: string
    classNameButton?: string
    classNameText?: string
    type?: "submit" | "button"
    onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
    disabled?: boolean
    variant?: ButtonVariant
    noTranslation?: boolean
    loading?: boolean
}

export const Button = ({ children,
    className = '',
    classNameButton = '',
    classNameText = '',
    type = "submit",
    onClick = () => { },
    disabled = false,
    loading = false,
    variant = ButtonVariant.BORDERED_RED_WIDE
}: IButton) => {
    
    return (
        <div className={`global ${className}`}>
            <button className={`${cl.button} ${cl[variant]}`} type={type} onClick={(event) => onClick(event)} disabled={disabled || loading}>
                {!loading &&
                    <span className={`${cl.buttonText} ${cl[classNameText]}`}>
                        {children}
                    </span>}
                {variant === ButtonVariant.W_ARROW_RED ? <svg width="40" height="45" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.7071 18.7071C26.0976 18.3166 26.0976 17.6834 25.7071 17.2929L19.3431 10.9289C18.9526 10.5384 18.3195 10.5384 17.9289 10.9289C17.5384 11.3195 17.5384 11.9526 17.9289 12.3431L23.5858 18L17.9289 23.6569C17.5384 24.0474 17.5384 24.6805 17.9289 25.0711C18.3195 25.4616 18.9526 25.4616 19.3431 25.0711L25.7071 18.7071ZM10 19L25 19L25 17L10 17L10 19Z" fill="white" />
                </svg> : null}
            </button>
        </div>
    )
}

Button.Variant = ButtonVariant;

