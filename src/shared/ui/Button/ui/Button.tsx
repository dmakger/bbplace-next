'use client'
import React, {ReactNode} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '../model/model'

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
                    </span>
                }
        
            </button>
        </div>
    )
}

Button.Variant = ButtonVariant;

