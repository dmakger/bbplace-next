'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_LKProduct.module.scss'
import { IProductProps } from "@/entities/Product/model/props.product.model"
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { GEAR_ICON } from '@/shared/ui/Icon/data/gear.data.icon'
import { ARROW_SECONDARY_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { InputCheckbox } from '@/shared/ui/Input/Checkbox'

interface ILKProduct extends IProductProps {
  className?: string,
  setIsOpenModal: Function
}

export const LKProduct = ({
  className,
  product,
  setIsOpenModal
}: ILKProduct) => {

  //API
  const { data: category } = CategoryAPI.useGetCategoryByIdQuery(product.categoryId)


  console.log(product);

  return (
    <div className={cls(cl.LKProduct, className)}>
      {category && <span className={cl.category}>
        {category[0].name}
      </span>}
      <div className={cl.imageContainer}>
        <ImageAPI src={product.media.attachments[0]} />
        <InputCheckbox className={cl.checkbox}/>
        <div className={cl.settings}>
          <Button variant={ButtonVariant.DEFAULT}
            className={cl.iconWrapper}
            beforeImage={GEAR_ICON}
            onClick={() => setIsOpenModal(true)}
          />
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
          <div className={cl.groupNavigate}>
            <p className={cl.groupQuantity}>
              +N
            </p>
            <Button variant={ButtonVariant.DEFAULT}
              beforeImage={ARROW_SECONDARY_WO_ICON}
              beforeProps={{ width: 14, height: 9, classNameImage: cl.arrowImage }}
              className={cl.iconWrapper}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
