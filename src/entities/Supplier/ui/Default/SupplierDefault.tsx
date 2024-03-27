import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierDefault.module.scss'
import { ISupplier, ISupplierAPI } from "../../model/supplier.model";
import { getSupplier } from "../../lib/getters.supplier.lib";
import { BaseSupplier } from "../../components/Base/BaseSupplier";
import { supplierApiToSupplier } from "../../lib/process.supplier.lib";
import { UserAPI } from "@/entities/Auth/api/auth.api";

interface SupplierDefaultProps{
    id: ISupplier['id'] | null
    // supplier?: ISupplier | ISupplierAPI
    // supplier: ISupplier
    className?: string,
}

export const SupplierDefault:FC<SupplierDefaultProps> = ({id, className}) => {

    const { data: supplier } = UserAPI.useGetUserDataQuery(id!)    
    const [supplierState, setSupplierState] = useState<ISupplier>()

    useEffect(() => {
        if (supplier)
            setSupplierState(supplierApiToSupplier(supplier))
    }, [supplier])

    // // setSupplierState(getSupplier(id, supplier))
    // // const _supplier = supplier as
    if (!supplierState)
        return <></>
    return (
        <div className={cls(className)}>
            <BaseSupplier supplier={supplierState} hasImage={true} classNameName={cl.name} />
        </div>
    )
}
