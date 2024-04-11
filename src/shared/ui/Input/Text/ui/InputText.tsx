'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_InputText.module.scss'
import { useAppSelector } from '@/storage/hooks'
import { useTranslate } from '@/shared/ui/Translate'
import { TRANSLATED_PLACEHOLDERS } from '@/shared/data/translate/placeholders.translate.data'

interface InputTextProps {
    name?: string
    placeholder?: string
    className?: string
}

export function InputText({className, placeholder, ...rest}: InputTextProps) {

    const language = useAppSelector(state => state.translate.language)

    const t = useTranslate(TRANSLATED_PLACEHOLDERS, placeholder ? placeholder : '', language)  
    
    return (
        <input type="text" placeholder={t} {...rest}
               className={cls(cl.input, className)} />
    )
}
