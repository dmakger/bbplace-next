"use client"

import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LangSelect.module.scss'
import Input from "@/shared/ui/Input/Input";

import { DEFAULT_LANGUAGE, LANG_LIST_DATA } from "@/shared/data/menu/lang.menu.data";
import { useActionCreators } from "@/storage/hooks";
import { IOption } from "@/shared/model/option.model";

interface LangSelectProps{
    className?: string,
}

export const LangSelect:FC<LangSelectProps> = ({className}) => {

    const [options, setOptions] = useState(LANG_LIST_DATA)
    const actionCreators = useActionCreators()

    const selectLanguage = (option: IOption) => actionCreators.setLanguage(typeof(option.value) === 'string' ? option.value : '');
    return (
        <Input.Select defaultOption={DEFAULT_LANGUAGE} 
                      options={options} 
                      className={cls(cl.langSelect,className)}
                      onClickOption={selectLanguage} />
    )
}
