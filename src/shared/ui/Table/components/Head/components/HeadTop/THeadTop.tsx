import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_THeadTop.module.scss'
import { ITable } from "@/shared/ui/Table/model/table.model";
import { Button } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize, ButtonVariant } from "@/shared/ui/Button/model/button.model";

interface THeadTopProps {
    amount: number
    onClickCancel: Function
    onClickDelete: Function
    className?: string,
}

export const THeadTop:FC<THeadTopProps> = ({amount, onClickCancel, onClickDelete, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.content}>
                <Button color={ButtonColor.Secondary} size={ButtonSize.Medium} variant={ButtonVariant.CONTENT} 
                        title="Отмена" onClick={onClickCancel} />
                <span className={cl.blockAmount}>Выбрано: {amount}</span>
                <Button color={ButtonColor.Negative} size={ButtonSize.Medium} variant={ButtonVariant.CONTENT} 
                        title="Удалить" onClick={onClickDelete}  />
            </div>
        </div>
    )
}
