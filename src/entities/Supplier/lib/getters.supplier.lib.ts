import { useAuthUserData } from "@/entities/Auth/hooks/useAuth.hooks";
import { ISupplier, ISupplierAPI } from "../model/supplier.model";
import { isSupplier } from "./boolean.supplier.lib";
import { supplierApiToSupplier } from "./process.supplier.lib";

export const getSupplier = (id?: ISupplier['id'] | null, supplier?: ISupplier | ISupplierAPI) => {
    let _supplier = supplier
    if (id)
        _supplier = getSupplierById(id)
    if (_supplier === undefined)
        return undefined
    if (!isSupplier(_supplier))
        _supplier = supplierApiToSupplier(_supplier as ISupplierAPI)
    return _supplier as ISupplier
}

export const getSupplierById = (id: ISupplier['id']) => {
    const {data: supplier} = useAuthUserData(id)
    return supplier
}
