import cl from './_ProductH.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { FC } from 'react'
import { FavouriteIcon, FavouriteIconVariant, SubscribeIcon } from '@/shared/ui/Icon/index'
import { SupplierInfo } from '@/shared/ui/SupplierInfo'
import { IProductProps } from '@/entities/Product/model/props.product.model'
import { ImageAPI } from '@/shared/ui/Image/ImageAPI'
import { getDiapason, getParameterByName } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib'
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason'
import { QuantityMetrics } from '@/shared/ui/QuantityMetrics/QuantityMetrics'
import { HeadingToTextProductTable } from '@/widgets/Product/Table/HeadingToText/ui/HeadingToTextProductTable'

interface ProductHProps extends IProductProps {

}

export const ProductH:FC<ProductHProps> = ({product, className}) => {
    // const image = getImage(product.media.attachments[0])
    console.log(product);
    const [minWholesale, maxWholesale] = getDiapason(product.media.wholesalePrices)
    
    return (
        <section className={cl.block}>
            <div className={cl.leftContainer}>
                <ImageAPI src={product.media.attachments[0]} width={271} height={271} />
            </div>
                <div className={cl.right}>
                    <div className={cl.mainInfo}>
                        <div className={cl.topContainer}>
                            <h4 className={cl.name}>{product.name}</h4>
                            <div className={cl.favorite}>
                                <FavouriteIcon variant={FavouriteIconVariant.EMPTY}/>
                            </div>
                        </div>
                        <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                                            currency={product.media.currency} className={cl.price} />
                        
                        <QuantityMetrics heading={'Мин. Кол-во'} 
                                         wholesale={minWholesale} 
                                         classNameText={cl.quantityText} />
                        <p className={cl.cardSupplier}>
                            ООО "Древние Русы"
                        </p>
                    </div>
                    <div className={cl.additionalInfo}>
                        <HeadingToTextProductTable product={product} />
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


