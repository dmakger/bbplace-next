import { FC } from "react";

import { cls } from '@/shared/lib/classes.lib';
import cl from './_LKTenderTableCellEditDelete.module.scss';
import { ButtonVariant } from "@/shared/ui/Button";
import { ButtonEdit } from "@/shared/ui/Button/data/Edit/ButtonEdit";
import { ButtonDelete } from "@/shared/ui/Button/data/Delete/ButtonDelete";

interface LKTenderTableCellEditDeleteProps {
    onClickDelete: Function
    onClickEdit: Function
    isRow?: boolean
    className?: string,
}

export const LKTenderTableCellEditDelete: FC<LKTenderTableCellEditDeleteProps> = ({ onClickEdit, onClickDelete, isRow = false, className }) => {
    return (
        <div className={cls(cl.cell, isRow ? cl.row : '', className)}>
            <ButtonEdit
                variant={ButtonVariant.CONTENT}
                handleEdit={onClickEdit} />

            <ButtonDelete
                variant={ButtonVariant.CONTENT}
                handleDelete={onClickDelete} />
        </div>
    )
}
