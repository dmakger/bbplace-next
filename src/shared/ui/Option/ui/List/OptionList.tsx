import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionList.module.scss'
import { OptionItem } from "../Item/OptionItem";
import { IOption } from "@/shared/model/option.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/model";

interface OptionListProps {
    title?: string,
    optionList: IOption[]
    activeIds?: number[]
    onClickItem?: Function
    className?: string,
    classNameItem?: string,
    isSizes?: boolean
}

export const OptionList: FC<OptionListProps> = ({ title,
    optionList,
    activeIds = [],
    onClickItem,
    className,
    classNameItem,
    isSizes
}) => {

    const [isList, setIsList] = useState<boolean>(false)

    const activeItem = optionList.find(it => it.id === activeIds[0])
    

    return (
        <div className={cls(cl.optionList, className)}>
            <div className={cls(cl.topContainer)}>
                <p className={cl.listTitle}>
                    {title}
                    <span>
                        {activeItem?.name}
                    </span>
                </p>
                {!isSizes && <Button
                    variant={ButtonVariant.BORDERED_BLUE}
                    color={ButtonColor.Secondary}
                    size={ButtonSize.Small}
                    title={isList ? 'Список' : 'Фото'}
                    onClick={() => setIsList(!isList)} />}
            </div>

            <div className={cls(cl.itemContainer, isList ? cl.list : '')}>
                {optionList.map(it => (
                    <OptionItem option={it}
                        active={activeIds.includes(it.id)}
                        onClick={onClickItem}
                        key={it.id}
                        isSizes={isSizes}
                        isList={!isSizes ? isList : false}
                        classNameItem={classNameItem} />
                ))}
            </div>

        </div>
    )
}
