'use client'

import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ButtonGrayToBlack.module.scss'
import { useAppSelector } from "@/storage/hooks";
import { useTranslate } from "../../Translate";
import { TRANSLATED_BUTTONS } from "@/shared/data/translate/buttons.translate.data";

interface ButtonGrayToBlackProps{
    title: string
    onClick: Function
    className?: string,
}

export const ButtonGrayToBlack:FC<ButtonGrayToBlackProps> = ({title, onClick, className}) => {

    const language = useAppSelector(state => state.translate.language)

    const t = useTranslate(TRANSLATED_BUTTONS, title, language);

        return (
        <button onClick={e => onClick(e)} className={cls(cl.button, className)}>
            {t}
        </button>
    )
}
