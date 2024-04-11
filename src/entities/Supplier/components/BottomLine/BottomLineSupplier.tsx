import { FC } from "react"

import cl from './_BottomLineSupplier.module.scss'
import { VerifiedSupplier } from "../Verified/VerifiedSupplier";
import { ISupplier } from "../../model/supplier.model";
import { WrapperSeparator } from "@/shared/ui/Wrapper/Separator/WrapperSeparator";
import { isVerified } from "../../lib/boolean.supplier.lib";
import { T } from "@/shared/ui/Translate";

interface BottomLineSupplierProps{
    supplier: ISupplier
    className?: string,
}

export const BottomLineSupplier:FC<BottomLineSupplierProps> = ({supplier, className}) => {
    return (
        <WrapperSeparator className={className}>
            {isVerified(supplier) &&
                <VerifiedSupplier _isVerified={true} />
            }
            {supplier.country &&
                <span className={cl.country}><T>{supplier.country}</T></span>
            }
        </WrapperSeparator>
    )
}
