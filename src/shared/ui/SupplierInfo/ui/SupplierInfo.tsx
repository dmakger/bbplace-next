import { FC } from 'react'
import cl from './_SupplierInfo.module.scss'
import { ISupplier } from '@/entities/Supplier/model/supplier.model'

interface ISupplierInfo{
    ownerId?: ISupplier['id'],
    supplier?: ISupplier,
}


export const SupplierInfo:FC<ISupplierInfo> = ({ownerId, supplier}) => {
    return (
        <div className={cl.supplierInfo}>
            <p className={cl.supplierName}>
                ТОО «Standard Mittal»ТОО asdasdadsdsdsd
            </p>
            <div className={cl.bottomBlock}>
                <span className={cl.supplierStatus}>
                    Verified
                </span>
                <span>
                    &#8226;
                </span>
                <span>
                    Россия
                </span>
            </div>
        </div>
    )
}

