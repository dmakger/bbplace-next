"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LangSelect.module.scss'
import Input from "@/shared/ui/Input/Input";
import { LANG_LIST_DATA, RUS_LANG_ITEM_DATA } from "@/shared/data/menu/lang.menu.data";

interface LangSelectProps{
    className?: string,
}

export const LangSelect:FC<LangSelectProps> = ({className}) => {
    const [options, setOptions] = useState(LANG_LIST_DATA)
    const [defaultOption, setDefaultOption] = useState(RUS_LANG_ITEM_DATA)

    return (
        <Input.Select defaultOption={defaultOption} 
                      options={options} 
                      className={cls(className)} />
    )
}
