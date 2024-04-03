import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_NavSupplier.module.scss'
import { ESupplierFavouriteViewItem, ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "../../data/view.supplier.data";
import { SubscribeAutoToSupplierButton } from "../Button/Subscribe/Auto/SubscribeAutoToSupplierButton";
import { ToChatAutoToSupplierButton } from "../Button/ToChat/Auto/ToChatAutoToSupplierButton";
import { TViewNav } from "../../model/nav.supplier.model";
import { isFavouriteViewSupplier, isSubscribeViewSupplier, isToChatViewSupplier, isToProfileViewSupplier } from "../../lib/boolean.supplier.lib";
import { ToProfileAutoToSupplierButton } from "../Button/ToProfile/Auto/ToProfileToSupplierButton";
import { ISupplier } from "../../model/supplier.model";
import { FavouriteAutoToSupplierButton } from "../Button/Favourite/Auto/FavouriteAutoToSupplierButton";

interface NavSupplierProps{
    supplierId: ISupplier['id']
    views?: TViewNav[]
    className?: string,
}

export const NavSupplier:FC<NavSupplierProps> = ({supplierId, views=[], className}) => {
    const props = {supplierId}

    return (
        <div className={cls(cls(cl.block, className))}>
            {views.map(view => (
                <>
                    {isSubscribeViewSupplier(view) &&
                        <SubscribeAutoToSupplierButton view={view as ESupplierSubscribeViewItem} {...props} />
                    }
                    {isToChatViewSupplier(view) &&
                        <ToChatAutoToSupplierButton view={view as ESupplierToChatViewItem} {...props} />
                    }
                    {isToProfileViewSupplier(view) &&
                        <ToProfileAutoToSupplierButton view={view as ESupplierToProfileViewItem} {...props} />
                    }
                    {isFavouriteViewSupplier(view) &&
                        <FavouriteAutoToSupplierButton view={view as ESupplierFavouriteViewItem} {...props} />
                    }
                </>
            ))}
        </div>
    )
}
