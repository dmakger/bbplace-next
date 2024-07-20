import { FC } from "react"
import cl from './_ToChatSmallToSupplierButton.module.scss'

import { cls } from '@/shared/lib/classes.lib';
import { ToChatIcon } from "@/shared/ui/Icon/ui/ToChat/ToChatIcon";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface ToChatSmallToSupplierButtonProps{
    supplierId: ISupplier['id']
    className?: string,
    isWide?: boolean
}

export const ToChatSmallToSupplierButton:FC<ToChatSmallToSupplierButtonProps> = ({supplierId, className, isWide = false}) => {
    
    return (
        <Button variant={ButtonVariant.BACKGROUND_GRAY} 
                href={DASHBOARD_PAGES.CURRENT_CHAT(supplierId).path} 
                className={cls(className, isWide ? cl.buttonWide : '')}>
            <ToChatIcon />
        </Button>
    )
}
