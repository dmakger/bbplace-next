import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierWNav.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { supplierApiToSupplier } from "../../lib/process.supplier.lib";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ESupplierSubscribeViewItem } from "../../data/view.supplier.data";
import { NavSupplier } from "../../components/Nav/NavSupplier";
import { TViewNav } from "../../model/nav.supplier.model";
import { SupplierAuto } from "../this/Auto/SupplierAuto";
import { ESupplierAxis, ESupplierView } from "../../data/supplier.data";

interface SupplierWNavProps{
    id: ISupplier['id'] | null
    view?: ESupplierView
    subscribeView?: ESupplierSubscribeViewItem
    navs?: TViewNav[] 
    axis?: ESupplierAxis
    className?: string,
    classNameNavs?: string,
}

export const SupplierWNav:FC<SupplierWNavProps> = ({id, view=ESupplierView.LARGE_WHITE, subscribeView=ESupplierSubscribeViewItem.NONE, navs=[], axis=ESupplierAxis.HORIZONTAL, className, classNameNavs}) => {

    const { data: supplier } = UserAPI.useGetUserDataQuery(id!)    
    const [supplierState, setSupplierState] = useState<ISupplier>()

    useEffect(() => {
        if (supplier)
            setSupplierState(supplierApiToSupplier(supplier))
    }, [supplier])
    

    if (!supplierState)
        return <></>
    return (
        <div className={cls(cls(cl.block, axis === ESupplierAxis.VERTICAL ? cl.vertical : '', className))}>
            <SupplierAuto supplier={supplierState} 
                          view={view}
                          hasImage={false} 
                          subscribeView={subscribeView} />
            <NavSupplier views={navs} supplierId={supplierState.id} className={cls(cl.navs, classNameNavs)} />
        </div>
    )
}