import Image from 'next/image'
import cl from './_ProductH.module.scss'
import productImage from '@/shared/assets/img/productImage.jpg'
import { Button } from '@/shared/ui/Button'
import { ButtonVariant } from '@/shared/ui/Button/model/model'
import { FC } from 'react'
import { FavouriteIcon, FavouriteIconVariant, SubscribeIcon } from '@/shared/ui/Icon/index'
import { SupplierInfo } from '@/shared/ui/SupplierInfo'
import { additionalInfoOptions } from '../model/horizontalCard.data'
import { IProductProps } from '@/entities/Product/model/props.product.model'
import { getImage } from '@/shared/lib/image.lib'
import { ImageAPI } from '@/shared/ui/Image/ImageAPI'
import { Wholesale } from '@/entities/Metrics/ui/Wholesale/Wholesale'

interface ProductHProps extends IProductProps {

}

export const ProductH:FC<ProductHProps> = ({product, className}) => {
    // const image = getImage(product.media.attachments[0])
    // console.log(product);
    
    return (
        <section className={cl.block}>
            <div className={cl.leftContainer}>
                <ImageAPI src={product.media.attachments[0]} width={271} height={271} />
            </div>
                <div className={cl.rightContainer}>
                    <div className={cl.mainInfo}>
                        <div className={cl.topContainer}>
                            <h4 className={cl.name}>{product.name}</h4>
                            <div className={cl.favourite}>
                                <FavouriteIcon variant={FavouriteIconVariant.EMPTY}/>
                            </div>
                        </div>
                        <Wholesale wholesales={product.media.wholesalePrices} 
                                   currency={product.media.currency?.toString()} className={cl.cardPrice} />
                        {/* <p className={cl.cardPrice}>
                            305,80 RUB - 9 237 RUB<span> /шт.</span>
                        </p> */}
                        <p className={cl.cardQuantity}>
                            Мин. Кол-во: <span>10 кг</span>
                        </p>
                        <p className={cl.cardSupplier}>
                            ООО "Древние Русы"
                        </p>
                    </div>
                    <div className={cl.additionalInfo}>
                        <div className={cl.options}>
                            {additionalInfoOptions.map(el => (
                                <p key={el}>{el}</p>
                            ))}
                        </div>
                        <div className={cl.info}>
                            <p>
                                Россия
                            </p>
                            <p>
                                Статус (товара)
                            </p>
                            <p>
                                есть на складе
                            </p>
                            <p>
                                Описание (несколько слов чтобы лазило) потом
                            </p>
                        </div>
                    </div>
                    <div className={cl.buttonContainer}>
                        <div className={cl.leftBlock}>
                            <SupplierInfo />
                            <SubscribeIcon  />
                        </div>
                        <Button variant={ButtonVariant.BORDERED_RED_WIDE}>
                            Связаться с поставщиком
                        </Button>
                    </div>
                    <div className={cl.buttonContainerMobile}>
                        <Button variant={ButtonVariant.BORDERED_RED_NARROW}>
                            Написать
                        </Button>
                        <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART}/>
                    </div>
                </div>
        </section>
    )
}


