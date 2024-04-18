import { cls } from '@/shared/lib/classes.lib';
import cl from './_ProductASC.module.scss';
import { ImageAPI } from '@/shared/ui/Image/API/ImageAPI';
import { FavouriteAutoToSupplierButton } from '@/entities/Supplier/components/Button/Favourite/Auto/FavouriteAutoToSupplierButton';
import { ESupplierFavouriteViewItem } from '@/entities/Supplier/data/view.supplier.data';
import { IProductProps } from '@/entities/Product/model/props.product.model';
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib';
import { WholesaleDiapason } from '@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason';
import { IProduct } from '@/entities/Product/model/product.model';

interface IProductASC extends IProductProps { }

export const ProductASC = ({ product, className }: IProductASC) => {
    const media = JSON.parse(product.media) as IProduct['media']


    const [minWholesale, maxWholesale] = getDiapason(media.wholesalePrices);

    return (

        <section className={cls(cl.block, className)}>
            <div className={cl.top}>
                <ImageAPI src={media.attachments[0]} width={179} height={175} className={cl.image} />
                <FavouriteAutoToSupplierButton view={ESupplierFavouriteViewItem.SMALL_FILL} className={cl.favourite} />
            </div>
            <div className={cl.middle}>
                <h4 className={cl.name}>{product.name}</h4>
                <div className={cl.priceWrapper}>
                    <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                        currency={media.currency} classNameText={cl.price} />
                </div>
            </div>
        </section>

    );
};
