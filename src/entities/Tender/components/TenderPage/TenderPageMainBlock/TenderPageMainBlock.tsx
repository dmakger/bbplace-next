import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageMainBlock.module.scss'
import { TenderPageHeader, TenderPageMainInfo } from "../../.."
import { ETenderType, IPurchaseTender, ISaleTender } from "../../../model/tender.model"
import { Button, ButtonVariant } from "@/shared/ui/Button"

interface ITenderPageMainBlock {
    className?: string,
    tender: ISaleTender | IPurchaseTender,
    tenderType: ETenderType
}

export const TenderPageMainBlock = ({
    className,
    tender,
    tenderType
}: ITenderPageMainBlock) => {
    return (
        <section className={cls(cl.TenderPageMainBlock, className)}>
            <TenderPageHeader
                tender={tender}
                tenderType={tenderType} />
            <TenderPageMainInfo tender={tender} />
        </section>
    )
}
