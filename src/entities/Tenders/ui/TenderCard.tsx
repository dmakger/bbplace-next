import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderCard.module.scss'
import { FavouriteIcon, FavouriteIconVariant } from "@/shared/ui/Icon"
import { SupplierInfo } from "@/shared/ui/SupplierInfo"
import { Button, ButtonVariant } from "@/shared/ui/Button"

interface ITenderCard{
    className?: string,

}

export const TenderCard= ({
    className
}: ITenderCard) => {
    return (
        <div className={cls(cl.TenderCard, className)}>
            <div className={cl.topContainer}>
                <div className={cl.info}>
                    <span className={cl.applicationType}>
                        Продажа
                    </span>
                    <span className={cl.category}>
                        Еда и овощи
                    </span>
                </div>
                <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART}/>
            </div>
            <div className={cl.middleContainer}>
                <span className={cl.cardTitle}>
                    Самоклеящаяся бумага для цифровой печати
                </span>
            </div>
            <div className={cl.bottomContainer}>
                <div className={cl.suppplierBlock}>
                    <SupplierInfo tendersCard={true}/>

                </div>
                <Button variant={ButtonVariant.BORDERED_RED_WIDE}>
                    Связаться с поставщиком
                </Button>
            </div>
        </div>
    )
}
