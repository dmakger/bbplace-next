'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_ProductLK.module.scss'
import { IProductProps } from "@/entities/Product/model/props.product.model"
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { GEAR_ICON } from '@/shared/ui/Icon/data/gear.data.icon'
import { ARROW_SECONDARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { InputCheckbox } from '@/shared/ui/Input/ui/Checkbox'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { BottomProductSettingsModal } from '@/features/Modal/BottomProductSettings'
import { EProductLKVariants } from '../../model/productLK.model'

interface IProductLK extends IProductProps {
  className?: string,
  variant?: EProductLKVariants
  setIsOpenModal: Function,
}

export const ProductLK = ({
  className,
  variant = EProductLKVariants.DEFAULT,
  product,
  setIsOpenModal,
}: IProductLK) => {

  //API
  const { data: category } = CategoryAPI.useGetCategoryByIdQuery(product.categoryId)
  const { data: productAPIListGroup } = ProductAPI.useGetProductsByGroupQuery(product && product.groupId ? product.groupId : skipToken, { refetchOnMountOrArgChange: true })

  return (
    <div className={cls(cl.LKProduct, className)}>
      {variant === EProductLKVariants.DEFAULT && category && <span className={cl.category}>
        {category[0].name}
      </span>}
      <div className={cl.imageContainer}>
        <ImageAPI src={product.media.attachments[0]} />
        <InputCheckbox className={cl.checkbox} />
        <div className={cl.settings}>
          {variant === EProductLKVariants.DEFAULT
            ? <Button variant={ButtonVariant.DEFAULT}
              className={cl.iconWrapper}
              beforeImage={GEAR_ICON}
              onClick={() => setIsOpenModal(true)}
            /> :
            <BottomProductSettingsModal
              className={cl.groupSettings}
              product={product}
              setIsOpen={setIsOpenModal}
              isTitle={false}
            />}
        </div>

      </div>
      <div className={cl.infoContainer}>
        <h5 className={cl.productName}>
          {product.name}
        </h5>
        <div className={cl.bottomContainer}>
          <div className={cl.productRestInfo}>
            <p className={cl.productColor}>
              {product.media.color}
            </p>
            <span className={cl.productArticle}>
              {product.media.article}
            </span>
          </div>
          {variant === EProductLKVariants.DEFAULT && productAPIListGroup && productAPIListGroup?.length > 1 && <div className={cl.groupNavigate}>
            <p className={cl.groupLength}>
              +{productAPIListGroup?.length - 1}
            </p>
            <Button variant={ButtonVariant.DEFAULT}
              beforeImage={ARROW_SECONDARY_WO_ICON}
              beforeProps={{ width: 14, height: 9, classNameImage: cl.arrowImage }}
              className={cl.iconWrapper}
              onClick={() => setIsOpenModal(true)}
            />
          </div>}
        </div>
      </div>
    </div>
  )
}
