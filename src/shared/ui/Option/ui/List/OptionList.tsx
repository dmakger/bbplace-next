import { FC, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_OptionList.module.scss'
import { IOption } from "@/shared/model/option.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/model";
import { OptionItem } from "../Item/OptionItem";
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize";

interface OptionListProps {
    title?: string,
    optionList: IOption[]
    activeIds?: number[]
    onClickItem?: Function
    className?: string,
    classNameItem?: string,
    isSizes?: boolean,
    isOnHover?: boolean
}

export const OptionList: FC<OptionListProps> = ({
    title,
    optionList,
    activeIds = [],
    onClickItem,
    className,
    classNameItem,
    isSizes,
    isOnHover
}) => {

    //STATE
    const [isList, setIsList] = useState<boolean>(false)
    const [partOptionsList, setPartOptionsList] = useState<IOption[]>(optionList)
    const [restOptionsList, setRestOptionsList] = useState<IOption[]>([])
    const [itemsWidths, setItemsWidths] = useState<number[]>([]);
    const [is1024, setIs1024] = useState<boolean>(false)

    //REF
    const optionsContainer = useRef<HTMLDivElement>(null)

    //VARIABLE
    const activeItem = optionList.find(it => it.id === activeIds[0])

    
    //EFFECT
    useEffect(() => {
        if (optionList.length > 0 && isSizes && !is1024) {

            const optionsWidthArray = itemsWidths.slice(0, optionList.length);
            let sum = 0;
            //длина массива, элементы которого вместятся в заданную ширину
            let visibleArrayLength = 0;

            for (let i = 0; i < optionsWidthArray.length; i++) {
                if (optionsWidthArray[i] === 0) return;
                visibleArrayLength += 1;
                sum += optionsWidthArray[i];
                if (optionsContainer.current) {
                    //12 - gap, 40 - padding                    
                    const itemsContainer = optionsContainer.current.offsetWidth - 40 - (12 * visibleArrayLength);
                    //*2 - так как хотим показывать две строки
                    if (sum >= itemsContainer * 2) {
                        setPartOptionsList(optionList.slice(0, i));
                        setRestOptionsList(optionList.slice(i, optionList.length))
                        break;
                    }
                }
            }
        }
    }, [itemsWidths]);

    return (
        <>
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

                <div className={cls(cl.itemContainer, isList ? cl.list : '')} ref={optionsContainer}>
                    {(isSizes ? partOptionsList : optionList).map(it => (
                        <OptionItem option={it}
                            active={activeIds.includes(it.id)}
                            onClick={onClickItem}
                            key={it.id}
                            isSizes={isSizes}
                            isList={!isSizes ? isList : false}
                            classNameItem={classNameItem}
                            isOnHover={isOnHover}
                            itemsWidths={itemsWidths}
                        />
                    ))}
                    {isSizes && restOptionsList.length > 0 && <Button
                        variant={ButtonVariant.DEFAULT}
                        color={ButtonColor.Secondary}
                        className={cl.restSizesButton}>
                        +{restOptionsList.length}
                    </Button>}
                </div>

            </div>
            <HandleSize width={1024} set={setIs1024} />

            </>

    )
}
