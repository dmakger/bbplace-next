import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ToChatLargeToSupplierButton.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface ToChatLargeToSupplierButtonProps{
    supplierId: ISupplier['id']
    isWide?: boolean
    className?: string,
}

export const ToChatLargeToSupplierButton:FC<ToChatLargeToSupplierButtonProps> = ({supplierId, isWide=false, className}) => {
    
    return (
        <Button variant={ButtonVariant.BORDERED_RED_WIDE} 
                href={DASHBOARD_PAGES.CURRENT_CHAT(supplierId)}
                className={cls(cl.buttonWrapper, className)} classNameButton={cl.button}>
            {isWide ? 'Связаться с поставщиком' : 'Написать'}
        </Button>
    )
}
