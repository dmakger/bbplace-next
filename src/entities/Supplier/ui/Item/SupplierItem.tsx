import { HeadingToTextTable } from '@/shared/ui/Text/HeadingToText/Table/HeadingToTextTable'
import { BaseSupplier } from '../../components/Base/BaseSupplier'
import { SupplierCategoryItem } from '../../components/SupplierCategoryItem/SupplierCategoryItem'
import { ISupplier } from '../../model/supplier.model'
import cl from './_SupplierItem.module.scss'
import { getDataHeadingToTextSupplierTable } from '../../lib/htt.supplier.lib'


interface ISupplierItem{
    supplier: ISupplier
}

export const SupplierItem = ({supplier}:ISupplierItem) => {
    
  return (
    <section className={cl.SupplierItem}>
      <div className={cl.leftContainer}>
        <BaseSupplier supplier={supplier} hasImage />
        <SupplierCategoryItem category={supplier.category} />
        <div className={cl.line}/>
        <HeadingToTextTable data={getDataHeadingToTextSupplierTable(supplier)}
          className={cl.table}
          classNameHeadingItem={cl.headingItem} 
          classNameColumn={cl.columnTable}
          />
      </div>
      <div className={cl.rightContainer}>
        dasdasd
      </div>
    </section>
  )
}
