import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_VerifiedSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
// import { isVerified } from "../../lib/boolean.supplier.lib";

interface VerifiedSupplierProps{
    has?: boolean
    supplier?: ISupplier
    className?: string,
}

export const VerifiedSupplier:FC<VerifiedSupplierProps> = ({has, supplier, className}) => {
    // const isValid = isVerified()

    return (
        <div className={cls(className)}>

        </div>
    )
}
