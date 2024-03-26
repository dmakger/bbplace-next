import { ISupplier, ISupplierAPI } from "../model/supplier.model";

export const isSupplier = (supplier: ISupplier | ISupplierAPI) => {
    return typeof supplier.category !== "string"
}

// export const isVerified = (has?: boolean, supplier?: ISupplier) => {

//     if (typeof x === "boolean")
//         return true
//     return x.isValid
// }