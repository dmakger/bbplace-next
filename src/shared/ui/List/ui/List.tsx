import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_List.module.scss'
import { IOption } from "@/shared/model/option.model";
import { ListDirection } from "@/shared/data/list.data";

export interface IListProps {
    options: IOption[]
    direction?: ListDirection

    onClickOption?: (it: IOption) => void
    className?: string,
    classNameOption?: string,
    classNameOptionText?: string,
}

export const List:FC<IListProps> = ({
    options, direction=ListDirection.Column, 
    onClickOption,
    className, classNameOption, classNameOptionText
}) => {
    // HANDLE
    const handleOnClickOption = (it: IOption) => {
        if (onClickOption)
            onClickOption(it)
    }

    return (
        <div className={cls(cl.list, cl[direction], className)}>
            {options.map(option => (
                <div onClick={() => handleOnClickOption(option)} className={cls(cl.option, classNameOption)} key={option.id}>
                    <span className={classNameOptionText}>{option.name}</span>
                </div>
            ))}
        </div>
    )
}
