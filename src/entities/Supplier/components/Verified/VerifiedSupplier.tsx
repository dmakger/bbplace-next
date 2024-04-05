'use client'

import { FC, useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_VerifiedSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { isVerified } from "../../lib/boolean.supplier.lib";
// import { isVerified } from "../../lib/boolean.supplier.lib";

interface VerifiedSupplierProps{
    supplier?: ISupplier
    _isVerified?: boolean
    className?: string,
}

export const VerifiedSupplier:FC<VerifiedSupplierProps> = ({supplier, _isVerified=false, className}) => {
    const [isValid, setIsValid] = useState(_isVerified)

    useEffect(() => {
        if (supplier)
            setIsValid(isVerified(supplier))
    }, [supplier])

    if (!isValid)
        return null

    return (
        <span className={cls(cl.text, className)}>Verified</span>
    )
}
