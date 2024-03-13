import Image from 'next/image'
import VerticalProductImage from '@/shared/assets/img/VerticalProductImage.jpg'
import cl from './_VerticalCard.module.scss'
import { Button } from '@/shared/ui/Button'
import { ButtonVariant } from '@/shared/ui/Button/model/model'
import { FavouriteIcon, FavouriteIconVariant, SubscribeIcon, SubscribeIconVariant } from '@/shared/ui/Icon/index'
import { SupplierInfo } from '@/shared/ui/SupplierInfo'
import { FC } from 'react'

interface IVerticalCard{

}

export const VerticalCard:FC<IVerticalCard> = ({}) => {
  return (
    <section className={cl.VerticalCard}>
      <div className={cl.topContainer}>
        <div className={cl.imageContainer}>
          <Image src={VerticalProductImage} alt='VerticalProductImage' className={cl.blurBackground} />
          <Image src={VerticalProductImage} alt='VerticalProductImage'  className={cl.frontImage} />
          <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART} className={cl.iconForVertCard} />
        </div>
        
      </div>
      <div className={cl.bottomContainer}>
        <div className={cl.mainInfo}>
          <h4 className={cl.cardTitle}>
            2023 зима новинка 350 GSM мужские негабаритные dsadsdsad jsklajdlsklj adljsalkjdlkajsl djslajdja sljdlasdjasjd 
          </h4>
          <div className={cl.priceAndQuantity}>
            <p className={cl.cardPrice}>
              305,80 RUB - 9 237 RUB<span>&nbsp;/шт.</span>
            </p>
            <p className={cl.cardQuantity}>
              Мин. Кол-во: <span>10 кг</span>
            </p>
          </div>
        </div>
        <div className={cl.bottomBlock}>
          <SupplierInfo/>
          <p className={cl.supplierInfoMobile}>
            ООО "Древние Русы"
          </p>
          <div className={cl.buttonsContainer}>
              <Button variant={ButtonVariant.BACKGROUND_RED}>
                Связаться с поставщиком
              </Button>
              <SubscribeIcon variant={SubscribeIconVariant.EMPTY} />
          </div>
          <div className={cl.buttonsContainerMobile}>
              <Button variant={ButtonVariant.CLEAR}>
                Написать
              </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

