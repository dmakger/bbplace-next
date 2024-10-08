import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierWNav.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ESupplierSubscribeViewItem } from "../../data/view.supplier.data";
import { NavSupplier } from "../../components/Nav/NavSupplier";
import { TViewNav } from "../../model/nav.supplier.model";
import { SupplierAuto } from "../this/Auto/SupplierAuto";
import { ESupplierAxis, ESupplierView } from "../../data/supplier.data";
import { IImageSizes } from "@/shared/model/image.model";
import { ReviewAPI } from "@/entities/Review/api/review.api";
import { skipToken } from "@reduxjs/toolkit/query";

interface SupplierWNavProps {
    id: ISupplier['id'] | null
    view?: ESupplierView,
    hasImage?: boolean,
    hasVerifiedStatus?: boolean,
    hasCountry?: boolean,
    subscribeView?: ESupplierSubscribeViewItem
    navs?: TViewNav[]
    axis?: ESupplierAxis
    className?: string,
    classNameName?: string,
    classNameSmallSupplier?: string,
    classNameSupplier?: string,
    classNameNavs?: string,
    classNameNavsItem?: string,
    classNameVerified?: string
    imageSizes?: IImageSizes

}

export const SupplierWNav:FC<SupplierWNavProps> = ({id, view=ESupplierView.LARGE_WHITE, subscribeView=ESupplierSubscribeViewItem.NONE, hasImage = false, hasVerifiedStatus = false, hasCountry, navs=[], axis=ESupplierAxis.HORIZONTAL, className, classNameSupplier, classNameSmallSupplier, classNameNavs, classNameNavsItem, classNameName, classNameVerified, imageSizes}) => {
    const { data: supplier } = UserAPI.useGetUserDataQuery(id ?? skipToken) 
    const { data: supplierRating } = ReviewAPI.useGetSupplierScoreQuery(id ?? skipToken)

    const [supplierState, setSupplierState] = useState<ISupplier>()

     useEffect(() => {
        if (supplier)
            setSupplierState(supplier)
    }, [supplier])
    

    if (!supplierState)
        return <></>
    return (
        <div className={cls(cl.block, axis === ESupplierAxis.VERTICAL ? cl.vertical : '', className)}>
            <SupplierAuto supplier={supplierState} 
                          view={view}
                          hasImage={hasImage} 
                          hasVerifiedStatus={hasVerifiedStatus}
                          hasCountry={hasCountry}
                          subscribeView={subscribeView}
                          classNameSupplier={classNameSupplier}
                          classNameSmallSupplier={classNameSmallSupplier}
                          supplierRating={supplierRating}
                          classNameName={classNameName}
                          classNameVerified={classNameVerified}
                          imageSizes={imageSizes} />
            <NavSupplier views={navs} supplierId={supplierState.id} 
                         className={cls(cl.navs, classNameNavs)} classNameItem={classNameNavsItem} />
        </div>
    )
}
