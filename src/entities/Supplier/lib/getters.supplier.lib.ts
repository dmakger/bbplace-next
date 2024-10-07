import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ISupplier } from "../model/supplier.model";

/**
 * Возращает имя поставщика
 */
export const getNameSupplier = (supplier: ISupplier) => {
    const brandName = supplier.brandName.trim()
    if (brandName)
        return brandName

    const legalName = supplier.legalName?.trim()
    if (legalName)
        return legalName
    return supplier.fullName.trim()
}

export const getCategoryNameSupplier = (category: ICategory[]) => {
    
    if(category.length){
        const filteredCategory = category.filter(it => it !== null)
        if(filteredCategory.length)
            return filteredCategory[filteredCategory.length - 1].name
    }
    return ''
    
}