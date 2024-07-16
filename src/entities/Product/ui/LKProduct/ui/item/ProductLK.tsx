'use client'

import { cls } from '@/shared/lib/classes.lib'
import cl from './_ProductLK.module.scss'
import { IProductProps } from "@/entities/Product/model/props.product.model"
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'
import { CategoryAPI } from '@/entities/Metrics/api/category.metrics.api'
import { GEAR_ICON } from '@/shared/ui/Icon/data/gear.data.icon'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { InputCheckbox } from '@/shared/ui/Input/ui/Checkbox'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { EProductLKVariants } from '../../model/productLK.model'
import { MAIN_PAGES } from '@/config/pages-url.config'

import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { useEffect, useState } from 'react'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { ButtonArrowWOLine } from '@/shared/ui/Button/data/Arrow/WOLine/ButtonArrowWOLine'
import { Axis } from '@/shared/model/button.model'
import { BottomInfoModal } from '@/features/Modal/BottomInfo'
import { EBottomInfoVariant } from '@/features/Modal/BottomInfo/model/bottomInfoModal.model'

interface IProductLK extends IProductProps {
  className?: string,
  variant?: EProductLKVariants,
  choosenProduct?: IProduct,
  setChoosenProduct?: Function,
  setGroupProducts?: Function
  setIsOpenSettings?: Function,
  isOpenGroup?: boolean,
  setIsOpenGroup?: Function,
  checkedProductsId?: number[],
  setсheckedProducts?: Function
}

export const ProductLK = ({
  className,
  variant = EProductLKVariants.DEFAULT,
  product,
  choosenProduct,
  setChoosenProduct,
  setGroupProducts,
  setIsOpenSettings,
  isOpenGroup,
  setIsOpenGroup,
  checkedProductsId,
  setсheckedProducts
}: IProductLK) => {

  //STATE
  const [groupProductsLength, setGroupProductsLength] = useState<number>(0)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  //API
  const { data: category } = CategoryAPI.useGetCategoryByIdQuery(product?.categoryId)
  const { data: productAPIListGroup } = ProductAPI.useGetProductsByGroupQuery(product.groupId ? product.groupId : skipToken, { refetchOnMountOrArgChange: true })
  const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
  const { data: metrics } = MetricsAPI.useGetMetricsQuery()

  //EFFECT

  useEffect(() => {
    if (checkedProductsId) setIsChecked(checkedProductsId.includes(product.id));
  }, [checkedProductsId]);

  useEffect(() => {
    if (setGroupProducts && productAPIListGroup && currencyList && metrics) {
      setGroupProducts(productApiListToProductList(productAPIListGroup, metrics, currencyList).filter(it => it.id !== product.id))
    }
    productAPIListGroup && setGroupProductsLength(productAPIListGroup.filter(it => it.id !== product.id).length)
  }, [productAPIListGroup, currencyList, metrics])

  useEffect(() => {
    if (checkedProductsId && setсheckedProducts && isChecked && !checkedProductsId.includes(product.id)) setсheckedProducts([...checkedProductsId, product.id])
    else if (!isChecked && setсheckedProducts) setсheckedProducts(checkedProductsId?.filter(it => it !== product.id))
  }, [isChecked])

  //FUNCTION
  const showSettingsModal = (product: IProduct) => {
    if (setChoosenProduct)
      setChoosenProduct(product)
    if (setIsOpenSettings)
      setIsOpenSettings(true)
  }

  const showGroupModal = (product: IProduct) => {
    if (setChoosenProduct)
      setChoosenProduct(product)
    if (setIsOpenGroup)
      setIsOpenGroup(true)
  }

  if (!product) return null;

  return (
    <div className={cls(cl.LKProduct, className)}>
      {variant === EProductLKVariants.DEFAULT && category && <span className={cl.category}>
        {category[0].name}
      </span>}
      <div className={cl.imageContainer}>
        <ImageAPI src={product.media.attachments[0]} />
        <InputCheckbox className={cl.checkbox}
          setIsChecked={setIsChecked}
          isChecked={isChecked}

        />
        <div className={cl.settings}>
          {variant === EProductLKVariants.DEFAULT
            ? <Button variant={ButtonVariant.DEFAULT}
              className={cl.iconWrapper}
              beforeImage={GEAR_ICON}
              onClick={() => showSettingsModal(product)}
            /> :
            <BottomInfoModal
              variant={EBottomInfoVariant.SETTINGS}
              classNameButtonContainer={cl.groupSettings}
              product={product}
              setIsOpen={setIsOpenGroup ? setIsOpenGroup : () => { }}
              isTitle={false}
            />}
        </div>

      </div>
      <div className={cl.infoContainer}>
        <Button variant={ButtonVariant.DEFAULT}
          className={cl.productName}
          title={product.name ?? ''}
          href={MAIN_PAGES.CURRENT_PRODUCT(product.id)} />
        <div className={cl.bottomContainer}>
          <div className={cl.productRestInfo}>
            <p className={cl.productColor}>
              {product.media.color}
            </p>
            <span className={cl.productArticle}>
              {product.media.article}
            </span>
          </div>
          {variant === EProductLKVariants.DEFAULT && groupProductsLength > 1 && <div className={cl.groupNavigate}>
            <p className={cl.groupLength}>
              +{groupProductsLength}
            </p>
            <ButtonArrowWOLine
              // onClick={showGroupModal}
              axis={choosenProduct && choosenProduct.id === product.id && isOpenGroup ? Axis.Top : Axis.Default}
              onClick={() => showGroupModal(product)} />
          </div>}
        </div>
      </div>
    </div>
  )
}