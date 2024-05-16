import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionList.module.scss'
import { OptionItem } from "../Item/OptionItem";
import { IOption } from "@/shared/model/option.model";

interface OptionListProps{
    optionList: IOption[]
    activeIds?: number[]
    onClickItem?: Function
    className?: string,
}

export const OptionList:FC<OptionListProps> = ({optionList, activeIds=[], onClickItem, className}) => {
    return (
        <div className={cls(cl.list, className)}>
            {optionList.map(it => (
                <OptionItem option={it} active={activeIds.includes(it.id)} onClick={onClickItem} key={it.id} />
            ))}
        </div>
    )
}
