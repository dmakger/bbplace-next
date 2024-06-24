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
import { Modal } from '@/shared/ui/Modal/Modal'
import { EModalView } from '@/shared/data/modal.data'
import { WrapperModalBottom } from '@/shared/ui/Wrapper/ModalBottom'
import { ProductLKList } from '../..'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { useEffect, useState } from 'react'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { MAIN_PAGES } from '@/config/pages-url.config'

interface IProductLK extends IProductProps {
  className?: string,
  variant?: EProductLKVariants
}

export const ProductLK = ({
  className,
  variant = EProductLKVariants.DEFAULT,
  product
}: IProductLK) => {

  //STATE
  const [groupProducts, setGroupProducts] = useState<IProduct[]>([])
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
  const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);

  //API
  const { data: category } = CategoryAPI.useGetCategoryByIdQuery(product?.categoryId)
  const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
  const { data: metrics } = MetricsAPI.useGetMetricsQuery()
  const { data: productAPIListGroup } = ProductAPI.useGetProductsByGroupQuery(product && product.groupId ? product.groupId : skipToken, { refetchOnMountOrArgChange: true })

  //EFFECT
  useEffect(() => {
    if (productAPIListGroup && currencyList && metrics)
      setGroupProducts(productApiListToProductList(productAPIListGroup, metrics, currencyList))
  }, [productAPIListGroup, currencyList, metrics])

  //FUNCTION
  const showSettingsModal = () => {
    if (setIsOpenSettings)
      setIsOpenSettings(true)
  }

  const showGroupModal = () => {
    if (setIsOpenGroup)
      setIsOpenGroup(true)
  }

  const closeTheModal = () => { 
      if (isOpenSettings) setIsOpenSettings(false)
      if (isOpenGroup) setIsOpenGroup(false)
      console.log(isOpenGroup);
      
  }

  if(!product) return

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
              onClick={showSettingsModal}
            /> :
            <BottomProductSettingsModal
              className={cl.groupSettings}
              product={product}
              setIsOpen={setIsOpenGroup}
              isTitle={false}
            />}
        </div>

      </div>
      <div className={cl.infoContainer}>
        <Button variant={ButtonVariant.DEFAULT}
         className={cl.productName}
         title={product.name ?? ''}
         href={MAIN_PAGES.CURRENT_PRODUCT(product.id)}/>
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
              +{groupProducts.length - 1}
            </p>
            <Button variant={ButtonVariant.DEFAULT}
              beforeImage={ARROW_SECONDARY_WO_ICON}
              beforeProps={{ width: 14, height: 9, classNameImage: cl.arrowImage }}
              className={cl.iconWrapper}
              onClick={showGroupModal}
            />
          </div>}
        </div>
      </div>
      <Modal view={EModalView.BOTTOM}
        buttonNode
        _isOpen={isOpenSettings || isOpenGroup}
        onClickOverlay={closeTheModal}
        >
        <WrapperModalBottom
          setIsOpen={closeTheModal}
          title={isOpenSettings ? "Выбор действия" : isOpenGroup ? 'Варианты товара' : ''}
          bottomChildren={product && isOpenSettings ? <BottomProductSettingsModal
            product={product}
            setIsOpen={setIsOpenSettings}
          /> : groupProducts && isOpenGroup && <ProductLKList
            variant={EProductLKVariants.GROUP_ITEM}
            products={groupProducts}
            />}
            classNameBottomChild={isOpenGroup && groupProducts.length > 2 ? cl.wBorder : ''}
        />
      </Modal>
    </div>
  )
}
