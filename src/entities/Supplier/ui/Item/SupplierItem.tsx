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
import { ProductASCList } from '@/entities/Product/ui/AtSupplierCard'
import { NavSupplier } from '../../components/Nav/NavSupplier'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useEffect, useState } from 'react'
import { HeadingToTextTable } from '@/shared/ui/Text'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'


interface ISupplierItem {
  supplier: ISupplier
}

export const SupplierItem = ({ supplier }: ISupplierItem) => {

  // STATE
  const [products, setProducts] = useState<IProduct[]>([])
  const [is768, setIs768] = useState<boolean>(false);
  const [is560, setIs560] = useState<boolean>(false);
  const [is445, setIs445] = useState<boolean>(false);
  const [is355, setIs355] = useState<boolean>(false);

  //API
  const { data: supplierScore } = ReviewAPI.useGetSupplierScoreQuery(supplier.id)
  const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplier.id, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
  const { data: supplierProducts } = ProductAPI.useGetProductsByUserQuery({ userId: supplier.id })
  const {data: metrics} = MetricsAPI.useGetMetricsQuery()
  const { data: currencies } = CurrencyAPI.useGetCurrenciesQuery()

  const linkHref = ''

  useEffect(() => {
    if(supplierProducts)
      setProducts(productApiListToProductList(supplierProducts, metrics, currencies))
  },[supplierProducts])

  const hasCategory = Array.isArray(supplier.category) ? supplier.category.some(it => it !== null) : supplier.category


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
            <HeadingToTextTable data={getDataHeadingToTextSupplierTable(supplier, supplierScore ?? 0, supplierReviews ? supplierReviews.length : 0, linkHref)}
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
            <ProductASCList products={products ?? []} link={''}/>
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
