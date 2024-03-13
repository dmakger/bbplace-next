import { FC } from 'react'
import cl from './_SupplierInfo.module.scss'

interface ISupplierInfo{
    name?: string,
    status?: string,
    country?: string
}


export const SupplierInfo:FC<ISupplierInfo> = ({name, status, country}) => {
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

