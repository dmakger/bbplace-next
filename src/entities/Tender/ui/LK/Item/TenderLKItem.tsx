import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderLKItem.module.scss'
import { ITender } from "@/entities/Tender/model/tender.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { IListItem } from "@/shared/model/list.model";
import { OptionT } from "@/shared/ui/Option/ui/this/OptionT";
import { OptionVariant } from "@/shared/data/option.data";

interface TenderLKItemProps<T> extends IListItem<T> {
    onClickDelete?: Function
}

export const TenderLKItem = <T extends ITender>({
    item: tender, 
    onClickDelete, 
    className
}: TenderLKItemProps<T>) => {
    return (
        <div className={cls(cl.block, className)}>
            {tender.category && (
                <span className={cl.category}>{tender.category.name}</span>
            )}
            <div className={cl.nameWrapper}>
                <span className={cl.name}>{tender.name}</span>
            </div>
            <OptionT variant={OptionVariant.TO_BLUE} 
                     text={tender.name} 
                     className={cl.option} classNameText={cl.optionText} />
            <div className={cl.bottom}>
                <div className={cl.files}>

                </div>
                <Button variant={ButtonVariant.CONTENT} 
                        color={ButtonColor.Negative} 
                        size={ButtonSize.Medium} 
                        beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                        onClick={onClickDelete} className={cls(cl.delete, className)} />
            </div>
        </div>
    )
}
