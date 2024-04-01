import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierWNav.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { BaseSupplier } from "../../components/Base/BaseSupplier";
import { supplierApiToSupplier } from "../../lib/process.supplier.lib";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "../../data/view.supplier.data";
import { NavSupplier } from "../../components/Nav/NavSupplier";
import { EViewWNavSupplier, TViewNav } from "../../model/nav.supplier.model";

interface SupplierWNavProps{
    id: ISupplier['id'] | null
    view?: EViewWNavSupplier
    navs?: TViewNav[] 
    className?: string,
}

export const SupplierWNav:FC<SupplierWNavProps> = ({id, view=EViewWNavSupplier.HORIZONTAL, navs=[], className}) => {

    const { data: supplier } = UserAPI.useGetUserDataQuery(id!)    
    const [supplierState, setSupplierState] = useState<ISupplier>()

    useEffect(() => {
        if (supplier)
            setSupplierState(supplierApiToSupplier(supplier))
    }, [supplier])
    

    if (!supplierState)
        return <></>
    return (
        <div className={cls(cls(cl.block, view === EViewWNavSupplier.VERTICAL ? cl.vertical : '', className))}>
            <div className={cl.supplier}>
                <BaseSupplier supplier={supplierState} 
                            hasImage={false} 
                            subscribeView={ESupplierSubscribeViewItem.SMALL} 
                            classNameName={cl.name} />
            </div>
            <NavSupplier views={navs} supplierId={supplierState.id} />
        </div>
    )
}
