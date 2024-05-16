'use client'

import { SupplierCategoryItem } from '../../components/SupplierCategoryItem/SupplierCategoryItem'
import { ISupplier } from '../../model/supplier.model'
import cl from './_SupplierItem.module.scss'
import { ReviewAPI } from '@/entities/Review/api/review.api'
import { REVIEW_LIMIT, REVIEW_START_PAGE } from '@/entities/Review/data/review.data'
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from '../../data/view.supplier.data'
import { SupplierWNav } from '../WNav/SupplierWNav'
import { getDataHeadingToTextSupplierTable } from '../../lib/htt.supplier.lib'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { ProductASC } from '@/entities/Product/ui/AtSupplierCard'
import { NavSupplier } from '../../components/Nav/NavSupplier'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { ScrollSlider } from '@/features/ScrollSlider'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { MAIN_PAGES } from '@/config/pages-url.config'


interface ISupplierItem {
  supplier: ISupplier
}

export const SupplierItem = ({ supplier }: ISupplierItem) => {

  // STATE
  const [is768, setIs768] = useState<boolean>(false);
  const [is560, setIs560] = useState<boolean>(false);
  const [is445, setIs445] = useState<boolean>(false);
  const [is355, setIs355] = useState<boolean>(false);

  //API
  const { data: supplierScore } = ReviewAPI.useGetSupplierScoreQuery(supplier.id)
  const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplier.id, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
  const { data: supplierProducts } = ProductAPI.useGetProductsByUserQuery({ userId: supplier.id })

  const hasCategory = Array.isArray(supplier.category) ? supplier.category.some(it => it !== null) : supplier.category
  const isButton = supplierProducts && supplierProducts.length > 2;

  return (
    <>
      <section className={cl.SupplierItem}>
        <SupplierWNav 
          classNameName={cl.supplierName}
          id={supplier.id}
          navs={[
            is768 ? ESupplierSubscribeViewItem.NONE : ESupplierSubscribeViewItem.LARGE,
            is768 ? ESupplierToChatViewItem.NONE : ESupplierToChatViewItem.LARGE_WIDE,
            is768 ? ESupplierToProfileViewItem.NONE : ESupplierToProfileViewItem.SMALL
          ]}
        />
        <div className={cl.bottomContainer}>
          <div className={cl.bottomLeftContainer}>
            {hasCategory && <SupplierCategoryItem category={supplier.category} />}
            <div className={cl.line} />
            <HeadingToTextTable data={getDataHeadingToTextSupplierTable(supplier, supplierScore ?? 0, supplierReviews ? supplierReviews.length : 0)}
              className={cl.table}
              classNameHeadingItem={cl.headingItem}
              classNameColumn={cl.columnTable}
            />
            <NavSupplier supplierId={supplier.id} views={[
              is560 ? ESupplierSubscribeViewItem.SMALL : (is768 ? ESupplierSubscribeViewItem.LARGE : ESupplierSubscribeViewItem.NONE),
              is355 ? ESupplierToChatViewItem.LARGE :  (is768 ? ESupplierToChatViewItem.LARGE_WIDE : ESupplierToChatViewItem.NONE),
              is445 ? ESupplierToProfileViewItem.SMALL :  (is768 ? ESupplierToProfileViewItem.LARGE : ESupplierToProfileViewItem.NONE)
            ]} />
          </div>
          <div className={cl.bottomRightContainer}>
            <ScrollSlider slides={supplierProducts} component={ProductASC} classNameSlidesContainer={!isButton ? cl.noButton : ''}>
              {isButton && <Button variant={ButtonVariant.BACKGROUND_RED_HUGE} href={MAIN_PAGES.CURRENT_SUPPLIER(supplier.id)}>
                Все товары
              </Button>}
            </ScrollSlider>
          </div>
        </div>
      </section>
      <HandleSize width={768} set={setIs768} />
      <HandleSize width={560} set={setIs560} />
      <HandleSize width={445} set={setIs445} />
      <HandleSize width={355} set={setIs355} />
    </>
  )
}
