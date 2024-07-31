import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderLKItem.module.scss'
import { ETenderType, ITender } from "@/entities/Tender/model/tender.model";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { IListItem } from "@/shared/model/list.model";
import { OptionT } from "@/shared/ui/Option/ui/this/OptionT";
import { OptionVariant } from "@/shared/data/option/option.data";

interface TenderLKItemProps extends IListItem<ITender> {
    onClickDelete?: (tenderId: ITender['id'], type?: ETenderType) => void
}

export const TenderLKItem: FC<TenderLKItemProps> = ({
    item: tender, 
    onClickDelete, 
    className
}) => {
    // HANDLE
    const handleOnClickDelete = () => {
        if (onClickDelete)
            onClickDelete(tender.id, tender.type)
    }

    return (
        <div className={cls(cl.block, className)}>
            {tender.category && (
                <span className={cl.category}>{tender.category.name}</span>
            )}
            <OptionT variant={OptionVariant.TO_BLUE} 
                     text={tender.name} 
                     className={cl.option} classNameText={cl.optionText} />
            <div className={cl.bottom}>
                <div className={cl.files}>
                    <span className={cl.filesTitle}>{'Файлы:'}</span>
                    <span className={cl.filesLength}>{tender.attachments.length}</span>
                </div>
                <div className={cl.deleteWrapper}>
                    <Button variant={ButtonVariant.CONTENT} 
                            color={ButtonColor.Negative} 
                            size={ButtonSize.Medium} 
                            beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                            onClick={handleOnClickDelete} className={cls(cl.delete, className)} />
                </div>
            </div>
        </div>
    )
}
