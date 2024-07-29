"use client"

import { Dispatch, FC, SetStateAction, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionsAttachmentList.module.scss'
import { IOption } from "@/shared/model/option.model";
import { OptionsAttachmentItem } from "../Item/OptionsAttachmentItem";
import { EOptionsAttachmentSize } from "../../data/optionsAttachment.data";

interface OptionsAttachmentListProps{
    options: IOption[]
    setOptions: Dispatch<SetStateAction<IOption[]>>
    size?: EOptionsAttachmentSize
    className?: string,
}

export const OptionsAttachmentList:FC<OptionsAttachmentListProps> = ({
    options, setOptions, 
    size=EOptionsAttachmentSize.BIG, 
    className
}) => {
    //STATE
    const [deletingOption, setDeletingOption] = useState<number>()

    // HANDLE
    const handleDeleteItem = (option: IOption) => {
        setDeletingOption(option.id)
        setTimeout(() => { // Для плавной анимации добавления и удаления OptionsAttachmentItem
            setOptions(prevOptions => prevOptions.filter(it => it.id !== option.id))
        }, 300)
    }

    return (
        <div className={cls(cl.block, className)}>
            {options.map(option => (
                <OptionsAttachmentItem
                    title={option.name}    
                    size={size}
                    handleDelete={() => handleDeleteItem(option)}
                    className={cls(cl.item, deletingOption === option.id ? cl.hide : '')}
                    key={option.id}
                />
            ))}
        </div>
    )
}
