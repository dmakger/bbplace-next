import { ISupplier, ISupplierAPI } from "../model/supplier.model";


export const supplierApiListToSupplierList = (supplierListAPI: ISupplierAPI[]): ISupplier[] => {
    return supplierListAPI.map(it => supplierApiToSupplier(it)!)
}


export const supplierApiToSupplier = (supplier?: ISupplierAPI) => {
    if (!supplier) return

    const category = supplier.category ? JSON.parse(supplier.category) as ISupplier['category'] : null
    const photoId = supplier.photoId ? JSON.parse(supplier.photoId) as ISupplier['photoId'] : null
    
    return {
        ...supplier,
        category, 
        photoId
    } as ISupplier
}