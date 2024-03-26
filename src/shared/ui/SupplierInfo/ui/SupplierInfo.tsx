import { FC } from 'react'
import cl from './_SupplierInfo.module.scss'
import { cls } from '@/shared/lib/classes.lib'

interface ISupplierInfo{
    name?: string,
    status?: string,
    country?: string,
    isVerified?: boolean
}


export const SupplierInfo: FC<ISupplierInfo> = ({
    name,
    status,
    country,
    isVerified = false
}) => {
    return (
        <div className={cls(cl.supplierInfo, isVerified ? cl.isVerified : '')}>
            <p className={cl.supplierName}>
                ТОО «Standard Mittal»ТОО asdasdadsdsdsd
            </p>
            {isVerified && <div className={cl.bottomBlock}>
                <span className={cl.supplierStatus}>
                    Verified
                </span>
                <span>
                    &#8226;
                </span>
                <span>
                    Россия
                </span>
            </div>}
        </div>
    )
}

