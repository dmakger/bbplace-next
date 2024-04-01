import { ISupplier } from "../model/supplier.model";

export const getNameSupplier = (supplier: ISupplier) => {
    if (supplier.brandName)
        return supplier.brandName
    return supplier.legalName
}