import { cls } from '@/shared/lib/classes.lib'
import { getCategoryNameSupplier } from '../../lib/getters.supplier.lib'
import cl from './_SupplierInfoLabel.module.scss'
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"

interface ISupplierInfoLabel{
    category?: ICategory[]
    vip?: boolean
}

export const SupplierInfoLabel = ({
  category,
  vip
}: ISupplierInfoLabel) => {
  return (
    <label className={cls(cl.SupplierCategoryItem, vip ? cl.vip : '')}>
        {category && category.length && <span>{getCategoryNameSupplier(category)}</span>}
        {vip && <span>PRIME member</span>}
    </label>
  )
}
