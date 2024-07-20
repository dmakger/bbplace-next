import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SupplierSmall.module.scss'
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { getNameSupplier } from "@/entities/Supplier/lib/getters.supplier.lib";
import Link from "next/link";
import { MAIN_PAGES } from "@/config/pages-url.config";

interface SupplierSmallProps{
    supplier: ISupplier
    className?: string,
}

export const SupplierSmall:FC<SupplierSmallProps> = ({supplier, className}) => {
    return (
        <Link href={MAIN_PAGES.CURRENT_SUPPLIER(supplier.id).path} className={cls(cl.block, className)}>
            <span className={cl.name}>{getNameSupplier(supplier)}</span>
        </Link>
    )
}
