'use client'

import { Button, ButtonVariant } from '@/shared/ui/Button'
import { IPrimeItem } from '../../model/mainChildrenPage.model'
import cl from './_PrimeList.module.scss'
import { ButtonSize } from '@/shared/ui/Button/model/button.model'
import { cls } from '@/shared/lib/classes.lib'
import { PrimeListItem } from '../PrimeListItem/PrimeListItem'
import { useEffect, useState } from 'react'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'
import { getTextByNumber } from '@/shared/lib/text.lib'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'

export const PrimeList = () => {

  //STATE
  const [primeListArrayItemsQuantity, setPrimeListArrayItemsQuantity] = useState<number[]>([])
  const [productsQuantity, setProductsQuantity] = useState<number>(0)
  const [filteredPrimeListArray, setFilteredPrimeListArray] = useState<IPrimeItem[]>([])
  const [is1280, setIs1280] = useState<boolean>(false)
  const [is1024, setIs1024] = useState<boolean>(false)

  //VARIABLE
  const primeListArray: IPrimeItem[] = [
    { name: 'Одежда', categoryId: 151, quantity: primeListArrayItemsQuantity[0]},
    { name: 'Автомобили и мотоциклы', categoryId: 335, quantity: primeListArrayItemsQuantity[1]},
    { name: 'Красота и уход', categoryId: 529, quantity: primeListArrayItemsQuantity[2]},
    { name: 'Обувь и аксессуары', categoryId: 3649, quantity: primeListArrayItemsQuantity[3]}
  ]

  //API
  const { data: productsQuantityNumber } = ProductAPI.useGetCountProductsQuery({ limit: 1 })
  const { data: firstItemQuantityNumber } = ProductAPI.useGetCountProductsQuery({ limit: 1, params: { 'CategoryId': `${primeListArray[0].categoryId}` } })
  const { data: secondItemQuantityNumber } = ProductAPI.useGetCountProductsQuery({ limit: 1, params: { 'CategoryId': `${primeListArray[1].categoryId}` } })
  const { data: thirdItemQuantityNumber } = ProductAPI.useGetCountProductsQuery({ limit: 1, params: { 'CategoryId': `${primeListArray[2].categoryId}` } })
  const { data: fourthItemQuantityNumber } = ProductAPI.useGetCountProductsQuery({ limit: 1, params: { 'CategoryId': `${primeListArray[3].categoryId}` } })

  //EFFECT
  useEffect(() => {
    if (firstItemQuantityNumber && secondItemQuantityNumber && thirdItemQuantityNumber && fourthItemQuantityNumber) {
      setPrimeListArrayItemsQuantity(
        [firstItemQuantityNumber, secondItemQuantityNumber, thirdItemQuantityNumber, fourthItemQuantityNumber]
        .map(it => it * 10))
    }
  }, [firstItemQuantityNumber, secondItemQuantityNumber, thirdItemQuantityNumber, fourthItemQuantityNumber])

  useEffect(() => {
    setFilteredPrimeListArray(primeListArray.map((it, index) => ({
      ...it,
      quantity: primeListArrayItemsQuantity[index] || it.quantity
    })));
  }, [primeListArrayItemsQuantity])

  useEffect(() => {
    if (productsQuantityNumber)
      setProductsQuantity(productsQuantityNumber)
  }, [productsQuantityNumber])

  useEffect(() => {
    if(is1280) setFilteredPrimeListArray(primeListArray.slice(0, -1))
  }, [is1280])

  useEffect(() => {
    if(is1024) setFilteredPrimeListArray(primeListArray)
  }, [is1024])

  return (
    <>
      <section className={cl.PrimeList}>
        <div className={cl.itemsContainer}>
          {filteredPrimeListArray.map((it, index) => (
            <PrimeListItem
              key={index}
              className={cls(
                index === primeListArray.length - 1 ? cl.lastItem : '',
                index === 0 ? cl.firstItem : '')}
              name={it.name}
              quantity={it.quantity}
              href={MAIN_PAGES.PRODUCTS_BY_CATEGORY(it.categoryId).path}
            />
          ))}
        </div>

        <div className={cl.bottomContainer}>
          <div className={cl.mainProductQuantityContainer}>
            {productsQuantity !== 0 && <h4>Уже {productsQuantity * 10}+ {getTextByNumber(productsQuantity ?? 0, 'товаров', 'товар', 'товара')}</h4>}
          </div>
          <div className={cl.buttonContainer}>
            <Button
              className={cl.button}
              title='Разместить заявку'
              variant={ButtonVariant.FILL}
              size={ButtonSize.Big}
              href={DASHBOARD_PAGES.NEW_TENDER.path}
            />
          </div>
        </div>

      </section>
      <HandleSize width={1280} set={setIs1280}/>
      <HandleSize width={1024} set={setIs1024}/>
    </>
  )
}
