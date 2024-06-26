import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ISupplier } from "../model/supplier.model";

export const getNameSupplier = (supplier: ISupplier) => {
    if (supplier.brandName.trim())
        return supplier.brandName
    return supplier.legalName
}

export const getCategoryNameSupplier = (category: ICategory[]) => {
    
    if(category.length){
        const filteredCategory = category.filter(it => it !== null)
        if(filteredCategory.length)
            return filteredCategory[filteredCategory.length - 1].name
    }
    return ''
    
}