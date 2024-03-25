import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierDefault.module.scss'
import { ISupplier, ISupplierAPI } from "../../model/supplier.model";
import { getSupplier } from "../../lib/getters.supplier.lib";
import { BaseSupplier } from "../../components/Base/BaseSupplier";

interface SupplierDefaultProps{
    // id?: ISupplier['id'] | null
    // supplier?: ISupplier | ISupplierAPI
    supplier: ISupplier
    className?: string,
}

export const SupplierDefault:FC<SupplierDefaultProps> = ({supplier, className}) => {
    // const [supplierState, setSupplierState] = useState<ISupplier>()
    // console.log('supplier id', id);

    // useEffect(() => {
    //     setSupplierState(getSupplier(id, supplier))
    // }, [getSupplier, id, supplier])

    // // setSupplierState(getSupplier(id, supplier))
    // // const _supplier = supplier as
    return (
        <div className={cls(className)}>
            <BaseSupplier supplier={supplier} hasImage={true} />
        </div>
    )
}
