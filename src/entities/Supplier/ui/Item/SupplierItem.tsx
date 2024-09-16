'use client'

import { ISupplier } from '../../model/supplier.model'
import cl from './_SupplierItem.module.scss'
import { ReviewAPI } from '@/entities/Review/api/review.api'
import { REVIEW_LIMIT, REVIEW_START_PAGE } from '@/entities/Review/data/review.data'
import { ESupplierFavouriteViewItem, ESupplierToProfileViewItem } from '../../data/view.supplier.data'
import { SupplierWNav } from '../WNav/SupplierWNav'
import { getDataHeadingToTextSupplierTable } from '@/shared/ui/Text/lib/htt.supplier.lib'
import { ProductAPI } from '@/entities/Product/api/product.api'

import { useEffect, useState } from 'react'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { EHeadingToTextVariants, IGetDataHeadingToTextSupplierTableVariant } from '@/shared/model/text.model'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { ButtonSize } from '@/shared/ui/Button/model/button.model'
import { SupplierInfoLabel } from '../../components/SupplierInfoLabel/SupplierInfoLabel'
import { FavouriteAutoToSupplierButton } from '../../components/Button/Favourite/Auto/FavouriteAutoToSupplerButton'
import { ProductASC } from '@/entities/Product/ui/AtSupplierCard'
import { EAtSupplierCardVariant } from '@/entities/Product/ui/AtSupplierCard/model/atSupplierCard.model'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { cls } from '@/shared/lib/classes.lib'
import { NavSupplier } from '../../components/Nav/NavSupplier'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'


interface ISupplierItem {
  supplier: ISupplier,
  className?: string,
  classNameSupplierWNav?: string,
  classNameBaseSupplier?: string
}

export const SupplierItem = ({
  supplier,
  className,
  classNameSupplierWNav,
  classNameBaseSupplier
 }: ISupplierItem) => {

  // STATE
  const [supplierProducts, setSupplierProducts] = useState<IProduct[]>([])
  const [is768, setIs768] = useState<boolean>(false)

  //API
  const { data: supplierRating } = ReviewAPI.useGetSupplierScoreQuery(supplier.id)
  const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplier.id, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
  const { data: supplierProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: supplier.id })

  //EFFECT
  useEffect(() => {
    if (supplierProductsAPI)
      setSupplierProducts(productApiListToProductList(supplierProductsAPI))
  }, [supplierProductsAPI])



  return (
    <>
      <section className={cls(cl.SupplierItem, className)}>
        <div className={cl.infoContainer}>
          <SupplierWNav
            hasImage
            className={cls(cl.supplierWNav, classNameSupplierWNav)}
            classNameName={cl.supplierName}
            classNameSupplier={cls(cl.baseSupplier, classNameBaseSupplier)}
            id={supplier.id}
            hasVerifiedStatus={true}
          />
          <div className={cl.subTopContainer}>
            {supplier.category?.some(it => it !== null) && <SupplierInfoLabel category={supplier.category} />}
            {/* <SupplierInfoLabel vip /> */}
          </div>

          <HeadingToTextTable
            variant={EHeadingToTextVariants.COLUMN}
            data={getDataHeadingToTextSupplierTable({
              variant: IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE,
              supplier,
              supplierRating: supplierRating ?? 0,
              supplierReviews: supplierReviews?.length ?? 0,
              isCountryNeeded: true
            })}
            classNameMain={cl.table}
            classNameHeadingItem={cl.headingItem}
            classNameTextItem={cl.textItem}
            classNameColumn={cl.columnTable}
          />
          <div className={cl.buttonsContainer}>
            <Button variant={ButtonVariant.BORDER} title='Откликнуться' size={ButtonSize.Small} href={DASHBOARD_PAGES.CHATS(supplier.id).path}/>
            <FavouriteAutoToSupplierButton supplierId={supplier.id} view={ESupplierFavouriteViewItem.SMALL_FILL} />
            <NavSupplier supplierId={supplier.id} views={[
              is768 ? ESupplierToProfileViewItem.SMALL : ESupplierToProfileViewItem.NONE
            ]} />
          </div>
        </div>
        {supplierProducts.length > 0 && <div className={cl.productCardsContainer}>
          <ProductASC product={supplierProducts[0]} supplierId={supplier.id} supplierName={supplier.brandName} />
          {supplierProducts[1] && <ProductASC product={supplierProducts[1]} variant={EAtSupplierCardVariant.SMALL} supplierId={supplier.id} supplierName={supplier.brandName} />}
        </div>}
      </section>
      <HandleSize width={768} set={setIs768} />
    </>
  )
}
