import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { ARROW_ICON } from "@/shared/ui/Icon/data/arrow.data.icon";

interface ToProfileSmallToSupplierButtonProps{
    supplierId: ISupplier['id']
    className?: string,
}

export const ToProfileSmallToSupplierButton:FC<ToProfileSmallToSupplierButtonProps> = ({supplierId, className}) => {
    return (
        <Button variant={ButtonVariant.W_ARROW_RED} href={MAIN_PAGES.CURRENT_SUPPLIER(supplierId).path} 
                afterImage={ARROW_ICON} afterProps={{width: 15, height: 15}}
                className={cls(className)} />
    )
}
