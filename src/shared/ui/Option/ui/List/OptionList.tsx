import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionList.module.scss'
import { OptionItem } from "../Item/OptionItem";
import { IOption } from "@/shared/model/option.model";

interface OptionListProps {
    title?: string,
    optionList: IOption[]
    activeIds?: number[]
    onClickItem?: Function
    className?: string,
}

export const OptionList: FC<OptionListProps> = ({ title, optionList, activeIds = [], onClickItem, className }) => {
   
    const activeItem = optionList.find(it => it.id === activeIds[0])

    return (
        <div className={cls(cl.optionList, className)}>
            <p className={cl.listTitle}>
                {title}
                <span>
                    {activeItem?.name}
                </span>
            </p>
            <div className={cl.list}>
                {optionList.map(it => (
                    <OptionItem option={it} active={activeIds.includes(it.id)} onClick={onClickItem} key={it.id} />
                ))}
            </div>

        </div>
    )
}
