import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductASC.module.scss';
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI';
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib';
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason';
import Link from 'next/link';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { IProduct } from '@/entities/Product/model/product.model';
import { EAtSupplierCardVariant } from '../../model/atSupplierCard.model';
import { IImageSizes } from '@/shared/model/image.model';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { ARROW_WLINE_DEFAULT_BLACK_ICON } from '@/shared/ui/Icon/data/arrow.data.icon';

interface IProductASC {
    product: IProduct,
    supplierName?: string,
    supplierId?: string,
    variant?: EAtSupplierCardVariant
    className?: string
}

export const ProductASC = ({
    product,
    supplierName,
    supplierId,
    variant = EAtSupplierCardVariant.DEFAULT,
    className
}: IProductASC) => {


    const media = typeof product.media === 'string' ? JSON.parse(product.media) : product.media;

    const [minWholesale, maxWholesale] = getDiapason(media.wholesalePrices, media.sizes);

    const imageSizes: IImageSizes = variant === EAtSupplierCardVariant.DEFAULT ? { width: 214, height: 183 } : { width: 159, height: 184 }

    const html = (
        <section className={cls(cl.ProductASC, className, variant === EAtSupplierCardVariant.SMALL ? cl.smallCard : '')}>
            <div className={cl.top}>
                <ImageAPI src={media.attachments[0]} width={imageSizes.width} height={imageSizes.height} className={cl.image} />
            </div>
            <div className={cl.middle}>
                <h4 className={cl.name}>{product.name}</h4>
                {variant === EAtSupplierCardVariant.DEFAULT && <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                    currency={media.currency} className={cl.price} classNameUnit={cl.priceUnit} />}
                {variant === EAtSupplierCardVariant.DEFAULT && <span className={cl.supplierName}>{supplierName}</span>}
            </div>

        </section>
    )

    if (variant === EAtSupplierCardVariant.SMALL) {
        return <div className={cl.smallCardContainer}>
            {html}
            <Button className={cl.buttonAtSmallCard}
                variant={ButtonVariant.CLEAR}
                title='Все товары'
                afterImage={ARROW_WLINE_DEFAULT_BLACK_ICON}
                href={MAIN_PAGES.CURRENT_SUPPLIER(supplierId ?? '').path}
            />
        </div>;
    }

    return (
        <Link href={`${MAIN_PAGES.CURRENT_PRODUCT(product.id)}`}>
            {html}
        </Link>
    );
};


// {/* <section className={cl.ProductASC}>
//             {/* <Link className={cls(cl.block, className)} href={`${MAIN_PAGES.CURRENT_PRODUCT(product.id)}`}> */}
//                 <div className={cl.top}>
//                     <ImageAPI src={media.attachments[0]} width={214} height={183} className={cl.image} />
//                 </div>
//                 <div className={cl.middle}>
//                     <h4 className={cl.name}>{product.name}</h4>
//                     <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
//                         currency={media.currency} className={cl.price} classNameUnit={cl.priceUnit} />
//                 </div>
//             {/* </Link> */}
//             {/* <FavouriteAutoToProductButton productId={product.id} view={EProductFavouriteViewItem.SMALL_FILL} className={cl.favourite} /> */}
//         </section> */}
