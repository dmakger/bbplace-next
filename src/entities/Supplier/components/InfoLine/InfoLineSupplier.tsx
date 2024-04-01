import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_InfoLineSupplier.module.scss'
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "../../data/view.supplier.data";
import { SubscribeAutoToSupplierButton } from "../Button/Subscribe/Auto/SubscribeAutoToSupplierButton";

interface InfoLineSupplierProps{
    subscribeView?: ESupplierSubscribeViewItem
    toChatView?: ESupplierToChatViewItem
    toProfileView?: ESupplierToProfileViewItem
    className?: string,
}

export const InfoLineSupplier:FC<InfoLineSupplierProps> = ({subscribeView, toChatView, toProfileView, className}) => {
    return (
        <div className={cls(className)}>
            <SubscribeAutoToSupplierButton view={subscribeView} />
        </div>
    )
}
