import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_NavSupplier.module.scss'
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "../../data/view.supplier.data";
import { SubscribeAutoToSupplierButton } from "../Button/Subscribe/Auto/SubscribeAutoToSupplierButton";
import { ToChatAutoToSupplierButton } from "../Button/ToChat/Auto/ToChatAutoToSupplierButton";
import { TViewNav } from "../../model/nav.supplier.model";
import { isSubscribeViewSupplier, isToChatViewSupplier, isToProfileViewSupplier } from "../../lib/boolean.supplier.lib";
import { ToProfileAutoToSupplierButton } from "../Button/ToProfile/Auto/ToProfileToSupplierButton";
import { ISupplier } from "../../model/supplier.model";
import React from "react";

interface NavSupplierProps{
    supplierId: ISupplier['id']
    views?: TViewNav[]
    className?: string,
    classNameItem?: string,
}

export const NavSupplier:FC<NavSupplierProps> = ({supplierId, views=[], className, classNameItem}) => {
    const props = {supplierId, className: classNameItem}

    return (
        <div className={cls(cl.block, className)}>
            {views.map((view, index) => (
                <React.Fragment key={index}>
                    {isSubscribeViewSupplier(view) &&
                        <SubscribeAutoToSupplierButton view={view as ESupplierSubscribeViewItem} {...props} />
                    }
                    {isToChatViewSupplier(view) &&
                        <ToChatAutoToSupplierButton view={view as ESupplierToChatViewItem} {...props} />
                    }
                    {isToProfileViewSupplier(view) &&
                        <ToProfileAutoToSupplierButton view={view as ESupplierToProfileViewItem} {...props} />
                    }
                </React.Fragment>
            ))}
        </div>
    )
}
