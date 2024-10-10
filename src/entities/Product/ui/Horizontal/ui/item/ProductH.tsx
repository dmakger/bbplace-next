'use client'

import { FC, useState } from 'react'
import { IProductProps } from '@/entities/Product/model/props.product.model'
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI'
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib'
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason'
import { QuantityMetrics } from '@/shared/ui/QuantityMetrics/QuantityMetrics'
import { HeadingToTextProductTable } from '@/widgets/Product/Table/HeadingToText/ui/HeadingToTextProductTable'
import { SupplierWNav } from '@/entities/Supplier/ui/WNav/SupplierWNav'
import { cls } from '@/shared/lib/classes.lib'
import cl from './_ProductH.module.scss'
import { ESupplierFavouriteViewItem, ESupplierSubscribeViewItem, ESupplierToChatViewItem } from '@/entities/Supplier/data/view.supplier.data'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { ESupplierAxis, ESupplierView } from '@/entities/Supplier/data/supplier.data'
import { getViewByIsList } from '@/shared/lib/view.lib'
import { IViewToIs } from '@/shared/model/view.model'
import { EProductFavouriteViewItem } from '@/entities/Product/data/view.product.data'
import { FavouriteAutoToProductButton } from '@/entities/Product/components/Buttons/Favourite/Auto/FavouriteAutoToProductButton'
import Link from 'next/link'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { IListItem } from '@/shared/model/list.model'
import { IProduct } from '@/entities/Product/model/product.model'
import { ButtonFavourite } from '@/shared/ui/Button/data/Favourite/ButtonFavourite'
import { FavouriteType } from '@/entities/Favourite/data/favourite.data'
import { ImageAPIVariants } from '@/shared/data/image.data'

interface ProductHProps extends IListItem<IProduct> {}

export const ProductH:FC<ProductHProps> = ({
    item: product,
    className,
    ...rest
}) => {    
    // VARS
    const [minWholesale, maxWholesale] = getDiapason(product.media.wholesalePrices, product.media.sizes)

    // STATE
    const [is1024, setIs1024] = useState(false)
    const [is768, setIs768] = useState(false)

    return (
        <>
            <section className={cls(cl.block, className)}>
                <div className={cl.left}>
                    <ImageAPI src={product.media.attachments[0]} 
                              width={271} height={271} 
                              variantDefault={ImageAPIVariants.Product}
                              className={cl.image} />
                </div>
                <div className={cl.right}>
                    <div className={cl.main}>
                        <div className={cl.top}>
                            <Link href={MAIN_PAGES.CURRENT_PRODUCT(product.id).path} className={cl.name}>{product.name}</Link>
                            <ButtonFavourite 
                                isFavourited={product.isFavorite}
                                isFill={false}
                                body={{objectId: product.id, objectType: FavouriteType.Product}} 
                                className={cl.favourite} />

                        </div>
                        <div className={cl.middle}>
                            <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                                                currency={product.media.currency} classNameText={cl.price} />
                            <QuantityMetrics heading={'Мин. Кол-во'} 
                                            wholesale={minWholesale}
                                            className={cl.quantity}
                                            classNameText={cl.quantityText} />
                        </div>
                        <HeadingToTextProductTable product={product} className={cl.table} classNameTextItem={cl.tableText} isShort={false} />
                    </div>
                    <SupplierWNav id={product.ownerId} 
                                  view={is768 ? ESupplierView.SMALL : ESupplierView.LARGE_GRAY}
                                  axis={is768 ? ESupplierAxis.VERTICAL : ESupplierAxis.HORIZONTAL}
                                  subscribeView={ESupplierSubscribeViewItem.SMALL}
                                  className={cl.supplier}
                                  classNameNavs={cl.supplierNavs}
                                  navs={[
                                    getViewByIsList([
                                        {view: ESupplierToChatViewItem.LARGE, _is: is768},
                                        {view: ESupplierToChatViewItem.SMALL, _is: is1024},
                                        {view: ESupplierToChatViewItem.LARGE_WIDE, _is: true},
                                    ] as IViewToIs[]) as ESupplierToChatViewItem,
                                    is768 ? ESupplierFavouriteViewItem.SMALL : ESupplierFavouriteViewItem.NONE,
                                  ]} />
                </div>
            </section>
            <HandleSize width={1024} set={setIs1024} />
            <HandleSize width={768} set={setIs768} />
        </>
    )
}


