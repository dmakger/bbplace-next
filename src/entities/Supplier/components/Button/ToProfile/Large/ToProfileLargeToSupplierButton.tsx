import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ToProfileLargeToSupplierButton.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { MAIN_PAGES } from "@/config/pages-url.config";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { ButtonColor } from "@/shared/ui/Button/model/model";

interface ToProfileLargeToSupplierButtonProps{
    supplierId: ISupplier['id']
    className?: string,
}

export const ToProfileLargeToSupplierButton:FC<ToProfileLargeToSupplierButtonProps> = ({supplierId, className}) => {
    return (
        <Button variant={ButtonVariant.TONAL}
        color={ButtonColor.Primary}
         href={MAIN_PAGES.CURRENT_SUPPLIER(supplierId)}
         className={cls(cl.button, className)}
         title={'Профиль'}/>
    )
}
