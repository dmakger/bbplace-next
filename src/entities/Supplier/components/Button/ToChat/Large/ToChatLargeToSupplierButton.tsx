import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ToChatLargeToSupplierButton.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";

interface ToChatLargeToSupplierButtonProps {
    supplierId: ISupplier['id']
    isWide?: boolean
    className?: string,
}

export const ToChatLargeToSupplierButton: FC<ToChatLargeToSupplierButtonProps> = ({ supplierId, isWide = false, className }) => {

    return (
        <Button variant={ButtonVariant.TONAL}
            color={ButtonColor.Secondary}
            size={ButtonSize.Medium}
            href={DASHBOARD_PAGES.CURRENT_CHAT(supplierId).path}
            className={cls(isWide ? cl.button : cl.buttonNarrow, className)}
            title='Сообщение' />
    )
}
