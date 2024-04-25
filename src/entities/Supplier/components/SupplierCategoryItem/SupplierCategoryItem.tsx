import { getCategoryNameSupplier } from '../../lib/getters.supplier.lib'
import cl from './_SupplierCategoryItem.module.scss'
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"

interface ISupplierCategoryItem{
    category: ICategory[]
}

export const SupplierCategoryItem = ({category}:ISupplierCategoryItem) => {
  return (
    <span className={cl.SupplierCategoryItem}>
        {category.length && getCategoryNameSupplier(category)}
    </span>
  )
}
