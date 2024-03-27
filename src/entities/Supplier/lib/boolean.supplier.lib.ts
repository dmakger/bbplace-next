import { ISupplier, ISupplierAPI } from "../model/supplier.model";

export const isSupplier = (supplier: ISupplier | ISupplierAPI) => {
    return typeof supplier.category !== "string"
}

export const isVerified = (supplier: ISupplier) => {
    return supplier.isValid
}