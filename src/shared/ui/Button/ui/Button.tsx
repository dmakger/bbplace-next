'use client'
import React, {ReactNode} from 'react'
import cl from './_Button.module.scss'
import { ButtonVariant } from '..'
import { WhiteArrowIcon } from '@/shared/data/icons.data'

interface IButton {
    children: ReactNode
    className?: string
    classNameButton?: string
    classNameText?: string
    type?: "submit" | "button"
    onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>
    onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
    onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
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
    onMouseEnter = () => { },
    onMouseLeave = () => { },
    disabled = false,
    loading = false,
    variant = ButtonVariant.BORDERED_RED_WIDE
}: IButton) => {
    
    return (
        <div className={`global ${className}`}>
            <button type={type} 
                    onClick={(event) => onClick(event)} 
                    onMouseEnter={(event) => onMouseEnter(event)} 
                    onMouseLeave={(event) => onMouseLeave(event)} 
                    disabled={disabled || loading} 
                    className={`${cl.button} ${cl[variant]} ${classNameButton}`}>
                {!loading &&
                    <span className={`${cl.buttonText} ${cl[classNameText]}`}>
                        {children}
                    </span>}
                {variant === ButtonVariant.W_ARROW_RED && <WhiteArrowIcon/> }
            </button>
        </div>
    )
}

Button.Variant = ButtonVariant;

