import { FC } from 'react'
import cl from './_SupplierInfo.module.scss'
import { cls } from '@/shared/lib/classes.lib'

interface ISupplierInfo{
    name?: string,
    status?: string,
    country?: string,
    tendersCard?: boolean
}


export const SupplierInfo: FC<ISupplierInfo> = ({
    name,
    status,
    country,
    tendersCard = false
}) => {
    return (
        <div className={cls(cl.supplierInfo, tendersCard ? cl.tendersCard : '')}>
            <p className={cl.supplierName}>
                ТОО «Standard Mittal»ТОО asdasdadsdsdsd
            </p>
            {!tendersCard && <div className={cl.bottomBlock}>
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

