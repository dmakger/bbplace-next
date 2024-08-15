import { cls } from "@/shared/lib/classes.lib"
import cl from './_PrimeListItem.module.scss'
import { PACKAGE_ICON } from "@/shared/ui/Icon/data/package.data.icon"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor } from "@/shared/ui/Button/model/button.model"
import { getTextByNumber } from "@/shared/lib/text.lib"

interface IPrimeListItem {
    className?: string,
    name: string,
    quantity: number,
    href: string
}

export const PrimeListItem = ({
    className,
    name,
    quantity,
    href
}: IPrimeListItem) => {
    return (
        <Button
            className={cls(cl.button, className)}
            variant={ButtonVariant.CLEAR}
            color={ButtonColor.Secondary}
            beforeImage={PACKAGE_ICON}
            beforeProps={{ width: 22, height: 24 }}
            href={href}>
            <div className={cl.itemInfo}>
                <span className={cl.name}>{name}</span>
                <span className={cl.quantity}>
                  {quantity}+ {getTextByNumber(quantity, 'товаров', 'товар', 'товара')}
                </span>
            </div>
        </Button>
    )
}
