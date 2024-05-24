import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductASC.module.scss';
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI';
import { IProductProps } from '@/entities/Product/model/props.product.model';
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib';
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason';
import Link from 'next/link';
import { MAIN_PAGES } from '@/config/pages-url.config';
import { EProductFavouriteViewItem } from '@/entities/Product/data/view.product.data';
import { FavouriteAutoToProductButton } from '@/entities/Product/components/Buttons/Favourite/Auto/FavouriteAutoToProductButton';

interface IProductASC extends IProductProps { }

export const ProductASC = ({ product, className }: IProductASC) => {

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
            <FavouriteAutoToProductButton productId={product.id} view={EProductFavouriteViewItem.SMALL_FILL} className={cl.favourite} />
        </section>
    );
};
