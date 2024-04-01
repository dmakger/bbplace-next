import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from "../data/view.supplier.data";

export type TViewNav = ESupplierSubscribeViewItem | ESupplierToChatViewItem | ESupplierToProfileViewItem

export enum EViewWNavSupplier {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}