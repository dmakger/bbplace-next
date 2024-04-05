import { ISupplier, ISupplierAPI } from "../model/supplier.model";

export const supplierApiToSupplier = (supplier?: ISupplierAPI) => {
    if (!supplier) return

    const category = JSON.parse(supplier.category) as ISupplier['category']
    const photoId = JSON.parse(supplier.photoId) as ISupplier['photoId']
    
    return {
        ...supplier,
        category, 
        photoId
    } as ISupplier
}