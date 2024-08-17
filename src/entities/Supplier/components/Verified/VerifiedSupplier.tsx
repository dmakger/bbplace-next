'use client'

import { useEffect, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_VerifiedSupplier.module.scss'
import { ISupplier } from "../../model/supplier.model";
import { isVerified } from "../../lib/boolean.supplier.lib";
import Image from "next/image";
import VerifiedIcon from '@/shared/assets/img/Verified/VerifiedIcon.svg'
// import { isVerified } from "../../lib/boolean.supplier.lib";

interface VerifiedSupplierProps {
    supplier?: ISupplier
    _isVerified?: boolean
    className?: string,
    hasIcon?: boolean,
}

export const VerifiedSupplier = ({
    supplier,
    _isVerified = false,
    className,
    hasIcon = false
}: VerifiedSupplierProps) => {

    const [isValid, setIsValid] = useState(_isVerified)

    useEffect(() => {
        if (supplier)
            setIsValid(isVerified(supplier))
    }, [supplier])


    return (
        <div className={cls(cl.VerifiedSupplier, className )}>
            {hasIcon && <Image src={VerifiedIcon} alt="verified" />}
            <span className={cls(isValid ? cl.valid : '', className)}>
                {isValid ? 'Проверен' : 'Не проверен'}
            </span>
        </div>
    )
}
