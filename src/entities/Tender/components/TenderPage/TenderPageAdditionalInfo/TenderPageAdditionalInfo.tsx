import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageAdditionalInfo.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { IPurchaseTender, ISaleTender } from "../../../model/tender.model"
import { TenderWholesalePrices } from "../TenderPageWholesalePrices/TenderPageWholesalePrices"

interface ITenderPageAdditionalInfo{
    className?: string,
    tender: ISaleTender | IPurchaseTender
}

export const TenderPageAdditionalInfo = ({
    className,
    tender
}: ITenderPageAdditionalInfo) => {
    
    return (
        <div className={cls(cl.TenderPageAdditionalInfo, className)}>
            <TenderWholesalePrices tender={tender}/>
            <Button variant={ButtonVariant.BACKGROUND_WHITE_WIDE} className={cl.button}>
                Откликнуться
            </Button>
        </div>
    )
}
