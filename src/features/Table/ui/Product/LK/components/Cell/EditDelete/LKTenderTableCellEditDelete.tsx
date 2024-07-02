import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKTenderTableCellEditDelete.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";
import { EDIT_ICON } from "@/shared/ui/Icon/data/edit.data.icon";

interface LKTenderTableCellEditDeleteProps {
    onClickDelete: Function
    onClickEdit: Function
    className?: string,
}

export const LKTenderTableCellEditDelete:FC<LKTenderTableCellEditDeleteProps> = ({onClickEdit, onClickDelete, className}) => {
    return (
        <div className={cls(cl.cell, className)}>
            <Button variant={ButtonVariant.CONTENT} 
                color={ButtonColor.Secondary} 
                size={ButtonSize.Medium} 
                beforeImage={EDIT_ICON} 
                onClick={onClickEdit}/>
            <Button variant={ButtonVariant.CONTENT} 
                color={ButtonColor.Negative} 
                size={ButtonSize.Medium} 
                beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                onClick={onClickDelete}/>
        </div>
    )
}
