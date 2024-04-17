'use client'

import { HeadingToTextTable } from '@/shared/ui/Text/HeadingToText/Table/HeadingToTextTable'
import { SupplierCategoryItem } from '../../components/SupplierCategoryItem/SupplierCategoryItem'
import { ISupplier } from '../../model/supplier.model'
import cl from './_SupplierItem.module.scss'
import { ReviewAPI } from '@/entities/Review/api/review.api'
import { REVIEW_LIMIT, REVIEW_START_PAGE } from '@/entities/Review/data/review.data'
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem, ESupplierToProfileViewItem } from '../../data/view.supplier.data'
import { SupplierWNav } from '../WNav/SupplierWNav'
import { getDataHeadingToTextSupplierTable } from '../../lib/htt.supplier.lib'


interface ISupplierItem {
  supplier: ISupplier
}

export const SupplierItem = ({ supplier }: ISupplierItem) => {

  const { data: supplierScore } = ReviewAPI.useGetSupplierScoreQuery(supplier.id)
  const { data: supplierReviews } = ReviewAPI.useGetSellerReviewsQuery({ supplierId: supplier.id, limit: REVIEW_LIMIT ?? 0, page: REVIEW_START_PAGE })
  const linkHref = ''

  return (
    <section className={cl.SupplierItem}>
      <SupplierWNav id={supplier.id}
        navs={[
          ESupplierSubscribeViewItem.LARGE,
          ESupplierToChatViewItem.LARGE_WIDE,
          ESupplierToProfileViewItem.SMALL
        ]}
      />
      <div className={cl.bottomContainer}>
        <div className={cl.bottomLeftContainer}>
          <SupplierCategoryItem category={supplier.category} />
          <div className={cl.line} />
          <HeadingToTextTable data={getDataHeadingToTextSupplierTable(supplier, supplierScore ?? 0, supplierReviews ? supplierReviews.length : 0, linkHref)}
            className={cl.table}
            classNameHeadingItem={cl.headingItem}
            classNameColumn={cl.columnTable}
          />

        </div>
        <div className={cl.bottomRightContainer}>

        </div>

      </div>
    </section>
  )
}
