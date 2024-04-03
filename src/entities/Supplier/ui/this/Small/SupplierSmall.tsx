import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierSmall.module.scss'
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { getNameSupplier } from "@/entities/Supplier/lib/getters.supplier.lib";

interface SupplierSmallProps{
    supplier: ISupplier
    className?: string,
}

export const SupplierSmall:FC<SupplierSmallProps> = ({supplier, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            <span className={cl.name}>{getNameSupplier(supplier)}</span>
        </div>
    )
}
