'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageHeader.module.scss'
import { ETenderType, IPurchaseTender, ISaleTender } from "../../../model/tender.model"
import { useMemo } from "react"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { PriceQuantity } from "@/shared/ui/PriceQuantity/PriceQuantity"
import { getTenderWholesalePrices } from "@/entities/Tender/lib/process.tender.lib"
import { TenderInfo, getDataTenderInfo } from "@/shared/ui/TenderInfo"
import { ButtonFavourite } from "@/shared/ui/Button/Favourite/ButtonFavourite"
import { ESupplierFavouriteViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { FavouriteSmallToSupplierButton } from "@/entities/Supplier/components/Button/Favourite/Small/FavouriteSmallToSupplierButton"
import { FavouriteIcon } from "@/shared/ui/Icon"
import { Axis } from "@/shared/model/button.model"
import { FavouriteAutoToSupplierButton } from "@/entities/Supplier/components/Button/Favourite/Auto/FavouriteAutoToSupplierButton"
import { FavouriteSVGIcon } from "@/shared/data/icons.data"


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

    const wholesalePrices = useMemo(() => {
        return [getTenderWholesalePrices(tender, tenderType)];
    }, [tender, tenderType])


    return (
            <div className={cls(cl.TenderPageHeader, className)}>
                <div className={cl.leftContainer}>
                    <div className={cl.topContainer}>
                        <span className={cl.tenderType}>{tenderType}</span>
                        <p className={cl.tenderName}>{tender.name}</p>
                    </div>
                    <div className={cl.restInfo}>
                        <FavouriteSmallToSupplierButton isCircled/>
                        <TenderInfo
                            data={getDataTenderInfo(tender, true)}
                            className={cl.restInfoTender}
                            classNameContainer={cl.restInfoContainer}
                            classNameHeading={cl.restInfoItem}
                            classNameText={cl.restInfoItemSpan} />
                    </div>
                </div>
                <div className={cl.rightContainer}>
                    <PriceQuantity 
                        wholesales={wholesalePrices}
                        className={cl.priceQuantity}
                        firstStart="За "
                        classNameQuantity={cl.quantity}
                        classNamePrice={cl.price} />
                    <Button variant={ButtonVariant.BACKGROUND_RED} className={cl.button}>
                        Заказать
                    </Button>
                </div>
            </div>
    )
}
