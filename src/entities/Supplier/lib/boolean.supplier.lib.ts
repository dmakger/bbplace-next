import { PREFIX_SUBSCRIBE_VIEW_SUPPLIER, PREFIX_TO_CHAT_VIEW_SUPPLIER, PREFIX_TO_PROFILE_VIEW_SUPPLIER } from "../data/view.supplier.data";
import { TViewNav } from "../model/nav.supplier.model";
import { ISupplier, ISupplierAPI } from "../model/supplier.model";

export const isSupplier = (supplier: ISupplier | ISupplierAPI) => {
    return typeof supplier.category !== "string"
}

export const isVerified = (supplier: ISupplier) => {
    return supplier.isValid
}


// BUTTONS NAV ENUMS
export const isSubscribeViewSupplier = (view: TViewNav) => {
    return view.includes(PREFIX_SUBSCRIBE_VIEW_SUPPLIER)
}

export const isToChatViewSupplier = (view: TViewNav) => {
    return view.includes(PREFIX_TO_CHAT_VIEW_SUPPLIER)
}

export const isToProfileViewSupplier = (view: TViewNav) => {
    return view.includes(PREFIX_TO_PROFILE_VIEW_SUPPLIER)
}