import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageWholesalePrices.module.scss'
import { ETenderType, ICommonTender } from "../../../model/tender.model"
import { getTenderType } from "../../../lib/tender.lib"

interface ITenderWholesalePrices{
    className?: string,
    tender: ICommonTender
}

export const TenderWholesalePrices = ({
    className,
    tender
}:ITenderWholesalePrices) => {

    const tenderType = getTenderType(tender)
    return (
        <div className={cls(cl.TenderWholesalePrices, className)}>
            <span className={cl.quantity}>
                {tenderType === ETenderType.PURCHASE ? `за ${tender.quantity} ${tender.quantityUnits}`
                : `за ${tender.minOrder} ${tender.minOrderUnits}`}
            </span>
            <span className={cl.currency}>
                {tenderType === ETenderType.PURCHASE ? `${tender.maximumBudget} ${tender.currency}`
                : `${tender.price} ${tender.currency}`}
            </span>
        </div>
    )
}
