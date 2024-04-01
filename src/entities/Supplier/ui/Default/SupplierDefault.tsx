import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierDefault.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { BaseSupplier } from "../../components/Base/BaseSupplier";
import { supplierApiToSupplier } from "../../lib/process.supplier.lib";
import { UserAPI } from "@/entities/Auth/api/auth.api";
import { ESupplierSubscribeViewItem } from "../../data/view.supplier.data";
import { InfoLineSupplier } from "../../components/InfoLine/InfoLineSupplier";

interface SupplierDefaultProps{
    id: ISupplier['id'] | null
    className?: string,
}

export const SupplierDefault:FC<SupplierDefaultProps> = ({id, className}) => {

    const { data: supplier } = UserAPI.useGetUserDataQuery(id!)    
    const [supplierState, setSupplierState] = useState<ISupplier>()

    useEffect(() => {
        if (supplier)
            setSupplierState(supplierApiToSupplier(supplier))
    }, [supplier])
    

    if (!supplierState)
        return <></>
    return (
        <div className={cls(cls(cl.block, className))}>
            <BaseSupplier supplier={supplierState} 
                          hasImage={false} 
                          subscribeView={ESupplierSubscribeViewItem.SMALL} 
                          classNameName={cl.name} />
            <InfoLineSupplier />
        </div>
    )
}
