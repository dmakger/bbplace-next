import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductASC.module.scss';
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI';
import { FavouriteAutoToSupplierButton } from '@/entities/Supplier/components/Button/Favourite/Auto/FavouriteAutoToSupplierButton';
import { ESupplierFavouriteViewItem } from '@/entities/Supplier/data/view.supplier.data';
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib';
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason';
import Link from 'next/link';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { IProduct } from '@/entities/Product/model/product.model';

interface IProductASC  {
    slide: IProduct,
    className?: string
 }

export const ProductASC = ({ slide, className }: IProductASC) => {

    const product = slide;

    const media = typeof product.media === 'string' ? JSON.parse(product.media) : product.media;

    const [minWholesale, maxWholesale] = getDiapason(media.wholesalePrices, media.sizes);

    return (
        <section className={cl.ProductASC}>
            <Link className={cls(cl.block, className)} href={`${MAIN_PAGES.CURRENT_PRODUCT(product.id)}`}>
                <div className={cl.top}>
                    <ImageAPI src={media.attachments[0]} width={179} height={175} className={cl.image} />
                </div>
                <div className={cl.middle}>
                    <h4 className={cl.name}>{product.name}</h4>
                    <div className={cl.priceWrapper}>
                        <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                            currency={media.currency} classNameText={cl.price} />
                    </div>
                </div>
            </Link>
            <FavouriteAutoToSupplierButton view={ESupplierFavouriteViewItem.SMALL_FILL} className={cl.favourite} />
        </section>
    );
};
