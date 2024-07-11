'use client'
import { Button, ButtonVariant } from "../.."
import { ButtonColor, ButtonSize } from "../../model/button.model"
import { TRASH_ICON } from "@/shared/ui/Icon/data/trash.data.icon"

interface IButtonDelete {
    classNameButton?: string,
    title?: string,
    handleDelete: Function

}

export const ButtonDelete = ({
    classNameButton,
    title,
    handleDelete
}: IButtonDelete) => {
    return (
        <Button title={title ? 'Удалить' : ''}
            variant={ButtonVariant.CONTENT}
            color={ButtonColor.Negative}
            size={ButtonSize.Medium}
            beforeImage={TRASH_ICON}
            beforeProps={{ width: 20, height: 20 }}
            onClick={() => handleDelete()}
            className={classNameButton}
        />
    )
}