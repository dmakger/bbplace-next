import { cls } from "@/shared/lib/classes.lib"
import cl from './_LKSubheader.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/model"
import { TRASH_ICON } from "@/shared/ui/Icon/data/trash.data.icon"

interface ILKSubheader{
    className?: string,
    checkedItemsNumber: number
}

export const LKSubheader= ({
    className,
    checkedItemsNumber
}: ILKSubheader) => {
    return (
        <div className={cls(cl.LKSubheader, className)}>
            <div className={cl.container}>
            <Button variant={ButtonVariant.TONAL}
                color={ButtonColor.Secondary}
                size={ButtonSize.Medium}
                title="Отмена"/>
                <span className={cl.checkedItemsNumber}>
                    Выбрано: <span>{checkedItemsNumber}</span>
                </span>
                <Button variant={ButtonVariant.TONAL}
                color={ButtonColor.Negative}
                size={ButtonSize.Medium}
                beforeImage={TRASH_ICON}
                beforeProps={{ width: 20, height: 20 }}
                title="Удалить"/> 
            </div>
        </div>
    )
}
