'use client'

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonGrayToBlack.module.scss'
import { T } from "../../Translate";

interface ButtonGrayToBlackProps{
    title: string
    onClick: Function
    className?: string,
}

export const ButtonGrayToBlack:FC<ButtonGrayToBlackProps> = ({title, onClick, className}) => {
    return (
        <button onClick={e => onClick(e)} className={cls(cl.button, className)}>
            <T>{title}</T>
        </button>
    )
}
