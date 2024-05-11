import { FC, ReactNode } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_WrapperTenderPageAdditionalInfo.module.scss'
import { TenderPageAdditionalInfo } from "@/entities/Tender/components/TenderPage/TenderPageAdditionalInfo/TenderPageAdditionalInfo";
import { IPurchaseTender, ISaleTender } from "@/entities/Tender/model/tender.model";

interface IWrapperTenderAdditionalInfo {
    children: ReactNode
    className?: string,
    tender: ISaleTender | IPurchaseTender
}

export const WrapperTenderAdditionalInfo: FC<IWrapperTenderAdditionalInfo> = ({ 
    children,
    className,
    tender
}) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            {children}
            <TenderPageAdditionalInfo tender={tender} className={cl.additionalInfo}/>
        </div>
    )
}
