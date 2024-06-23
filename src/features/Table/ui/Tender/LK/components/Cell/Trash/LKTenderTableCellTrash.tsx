import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKTenderTableCellTrash.module.scss'
import TableCell from "@/shared/ui/Table/componets/Cell";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { ETenderType, IBaseTender, ITender } from "@/entities/Tender/model/tender.model";

interface LKTenderTableCellTrashProps {
    tenderId: ITender['id']
    type?: ETenderType
    className?: string,
}

export const LKTenderTableCellTrash:FC<LKTenderTableCellTrashProps> = ({tenderId, type, className}) => {
    return (
        <Button variant={ButtonVariant.CONTENT} 
                color={ButtonColor.Negative} 
                size={ButtonSize.Medium} 
                beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} className={cls(cl.cell, className)} />
    )
}
