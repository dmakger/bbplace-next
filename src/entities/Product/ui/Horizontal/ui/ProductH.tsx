'use client'

import cl from './_ProductH.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { FC, useEffect, useState } from 'react'
import { FavouriteIcon, FavouriteIconVariant, SubscribeIcon } from '@/shared/ui/Icon/index'
import { SupplierInfo } from '@/shared/ui/SupplierInfo'
import { IProductProps } from '@/entities/Product/model/props.product.model'
import { ImageAPI } from '@/shared/ui/Image/ImageAPI'
import { getDiapason, getParameterByName } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib'
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason'
import { QuantityMetrics } from '@/shared/ui/QuantityMetrics/QuantityMetrics'
import { SupplierDefault } from '@/entities/Supplier/ui/Default/SupplierDefault'
import { getSupplier } from '@/entities/Supplier/lib/getters.supplier.lib'
import { ISupplier } from '@/entities/Supplier/model/supplier.model'
import { supplierApiToSupplier } from '@/entities/Supplier/lib/process.supplier.lib'
import { useAuthUserData } from '@/entities/Auth/hooks/useAuth.hooks'
import { HeadingToTextProductTable } from '@/widgets/Product/Table/HeadingToText/ui/HeadingToTextProductTable'

interface ProductHProps extends IProductProps {

}

export const ProductH:FC<ProductHProps> = ({product, className}) => {
    // STATE
    const [supplier, setSupplier] = useState<ISupplier>()
    const {data: supplierApi} = useAuthUserData(product.ownerId!)
    console.log('supplier Api', supplierApi, product.ownerId);

    // VARS
    const [minWholesale, maxWholesale] = getDiapason(product.media.wholesalePrices)
    
    // EFFECT
    useEffect(() => {
        setSupplier(supplierApiToSupplier(supplierApi))
    }, [supplierApi])

    console.log(product);
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
                        {/* <SupplierDefault id={product.ownerId} /> */}
                        {supplier &&
                            <SupplierDefault supplier={supplier} />
                        }
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


