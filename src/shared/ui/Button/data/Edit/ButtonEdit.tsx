'use client'

import { EDIT_ICON } from "@/shared/ui/Icon/data/edit.data.icon"
import { Button, ButtonVariant } from "../.."
import { ButtonColor, ButtonSize } from "../../model/button.model"

interface IButtonEdit {
    variant?: ButtonVariant,
    classNameButton?: string,
    title?: string,
    handleEdit: Function
}

export const ButtonEdit = ({
    variant,
    classNameButton,
    title,
    handleEdit
}: IButtonEdit) => {
    return (
        <Button title={title ? 'Редактировать' : ''}
            variant={variant ?? ButtonVariant.FILLED}
            color={ButtonColor.Secondary}
            size={ButtonSize.Medium}
            beforeImage={EDIT_ICON}
            beforeProps={{ width: 20, height: 20 }}
            onClick={() => handleEdit()}
            className={classNameButton}
        />
    )
}