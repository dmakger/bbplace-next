import { FC } from "react"

import cl from './_BottomLineSupplier.module.scss'
import { VerifiedSupplier } from "../Verified/VerifiedSupplier";
import { ISupplier } from "../../model/supplier.model";
import { isVerified } from "../../lib/boolean.supplier.lib";
import { cls } from "@/shared/lib/classes.lib";

interface BottomLineSupplierProps {
    supplier: ISupplier,
    supplierRating?: number,
    className?: string,
}

export const BottomLineSupplier: FC<BottomLineSupplierProps> = ({ supplier, supplierRating = 0, className }) => {
    return (
        <div className={cls(cl.lineContainer, className)}>
            {supplier.country &&
                <span>{supplier.country}</span>
            }
            {isVerified(supplier) &&
                <VerifiedSupplier _isVerified={true} />
            }
            {supplierRating > 0 &&
                <span className={cl.rating}>{supplierRating}</span>
            }
        </div>
    )
}
