'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageHeader.module.scss'
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAttachments } from "../../../model/tender.model"
import { useEffect, useState } from "react"
import { HandleSize } from "@/shared/ui/Handle/Size/HandleSize"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { getDate } from "@/shared/lib/dateTime.lib"
import { PriceQuantity } from "@/shared/ui/PriceQuantity/PriceQuantity"
import { getTenderWholesalePrices } from "@/entities/Tender/lib/process.tender.lib"
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model"


interface ITenderPageHeader {
    className?: string,
    tender: ISaleTender | IPurchaseTender,
    tenderType: ETenderType
}

export const TenderPageHeader = ({
    className,
    tender,
    tenderType
}: ITenderPageHeader) => {

    //STATE
    const [is500, setIs500] = useState(false)
    const [typedTender, setTypedTender] = useState<ISaleTender | IPurchaseTender>()
    const [wholesalePrices, setWholesalePrices] = useState<IWholesale[]>([])

    const images = tender.attachments.map((it: ITenderAttachments) => it.key)

    //EFFECT
    useEffect(() => {
        if(tenderType === ETenderType.PURCHASE){
            return setTypedTender(tender as IPurchaseTender)
        }
        return setTypedTender(tender as ISaleTender)

    }, [tender])
    

    useEffect(() => {
        if(typedTender)
            setWholesalePrices([...wholesalePrices, getTenderWholesalePrices(typedTender, tenderType)])
    }, [typedTender])

    return (
        <>
            <div className={cls(cl.TenderPageHeader, className)}>
                <div className={cl.leftContainer}>
                    <div className={cl.topContainer}>
                        <span className={cl.tenderType}>{tenderType}</span>
                        <p className={cl.tenderName}>{tender.name}</p>
                    </div>
                    <div className={cl.restInfo}>
                        <Button>
                            В избранное
                        </Button>
                        {tenderType === ETenderType.PURCHASE ? <p className={cl.restInfoItem}>
                            Количество: <span>{tender.quantity}</span>
                        </p> :
                         <p className={cl.restInfoItem}>
                                Минимальный заказ: <span>{tender.minOrder} {tender.minOrderUnits?.shortName}</span>
                        </p>}
                        <p className={cl.restInfoItem}>
                            Опубликовано: <span>{getDate(tender.createdAt)}</span>
                        </p>
                    </div>
                </div>
                <div className={cl.rightContainer}>
                    <PriceQuantity wholesales={wholesalePrices}
                     firstStart="За " 
                     classNameQuantity={cl.quantity}
                     classNamePrice={cl.price}/>
                    <Button variant={ButtonVariant.BACKGROUND_RED}>
                        Заказать
                    </Button>
                </div>
            </div>
            <HandleSize width={500} set={setIs500} />
        </>


    )
}
