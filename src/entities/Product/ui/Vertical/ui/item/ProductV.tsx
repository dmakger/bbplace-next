'use client'

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductV.module.scss';
import { FC, useState } from 'react';
import { getMinMax } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib';
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI';
import { ESupplierSubscribeViewItem, ESupplierToChatViewItem } from '@/entities/Supplier/data/view.supplier.data';
import { ESupplierAxis, ESupplierView } from '@/entities/Supplier/data/supplier.data';
import { SupplierWNav } from '@/entities/Supplier/ui/WNav/SupplierWNav';
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason';
import { QuantityMetrics } from '@/shared/ui/QuantityMetrics/QuantityMetrics';
import { IProductProps } from '@/entities/Product/model/props.product.model';
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize';
import Link from 'next/link';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { FavouriteAutoToProductButton } from '@/entities/Product/components/Buttons/Favourite/Auto/FavouriteAutoToProductButton';
import { EProductFavouriteViewItem } from '@/entities/Product/data/view.product.data';

interface ProductVProps extends IProductProps {}

export const ProductV: FC<ProductVProps> = ({ product, className }) => {
  // VARS  
  const [minWholesale, maxWholesale] = getMinMax(product.media.wholesalePrices, product.media.sizes);

  // STATE
  const [is768, setIs768] = useState(false);

  return (
    <>
      <section className={cls(cl.block, className)}>
        {/* <Link href={MAIN_PAGES.CURRENT_PRODUCT(product.id)}> */}
        <div className={cl.top}>
          <ImageAPI src={product.media.attachments[0]} width={271} height={271} className={cl.image} />
          <FavouriteAutoToProductButton productId={product.id} view={EProductFavouriteViewItem.SMALL_FILL} className={cl.favourite} />
        </div>
        <div className={cl.content}>
          <div className={cl.middle}>
            <Link href={MAIN_PAGES.CURRENT_PRODUCT(product.id).path} className={cl.name}>{product.name}</Link>
            <div className={cl.priceWrapper}>
              <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                                currency={product.media.currency} classNameText={cl.price} classNameUnit={cl.unit}/>
              <QuantityMetrics heading={'Мин. Кол-во'}
                              wholesale={minWholesale}
                              className={cl.quantity}
                              classNameText={cl.quantityText} />
            </div>
          </div>
          {/* </Link> */}
          <div className={cl.line} />
          <SupplierWNav id={product.ownerId}
                        view={is768 ? ESupplierView.SMALL : ESupplierView.LARGE_WHITE}
                        hasCountry
                        hasImage
                        hasVerifiedStatus
                        axis={ESupplierAxis.VERTICAL}
                        className={cl.supplier}
                        classNameNavs={cl.supplierNavs}
                        classNameNavsItem={cl.supplierNavsItem}
                        navs={[
                          is768 ? ESupplierSubscribeViewItem.NONE : ESupplierSubscribeViewItem.SMALL_WIDE,
                          is768 ? ESupplierToChatViewItem.SMALL_WIDE : ESupplierToChatViewItem.LARGE,
                        ]} />
        </div>
      </section>
      <HandleSize width={768} set={setIs768} />
    </>
  );
};
