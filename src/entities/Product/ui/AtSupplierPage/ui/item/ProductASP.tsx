import { cls } from "@/shared/lib/classes.lib"
import cl from './_ProductASP.module.scss'
import { IProductProps } from "@/entities/Product/model/props.product.model"
import Link from "next/link"
import { ImageAPI } from "@/shared/ui/Image/API/ImageAPI"
import { MAIN_PAGES } from "@/config/pages-url.config"
import { WholesaleDiapason } from "@/entities/Metrics/ui/Wholesale/Diapason/WholesaleDiapason"
import { ESupplierFavouriteViewItem, ESupplierToChatViewItem } from "@/entities/Supplier/data/view.supplier.data"
import { getDiapason } from "@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib"
import { QuantityMetrics } from "@/shared/ui/QuantityMetrics/QuantityMetrics"
import { NavSupplier } from "@/entities/Supplier/components/Nav/NavSupplier"

interface IProductASP extends IProductProps { }


export const ProductASP = ({
    className,
    product,
}: IProductASP) => {

    const media = typeof product.media === 'string' ? JSON.parse(product.media) : product.media;

    const [minWholesale, maxWholesale] = getDiapason(media.wholesalePrices, media.sizes);    

    return (
        <section className={cls(cl.ProductASP, className)}>
            <Link className={cls(cl.block, className)} href={`${MAIN_PAGES.CURRENT_PRODUCT(product.id)}`}>
                <div className={cl.top}>
                    <ImageAPI src={media.attachments[0]} width={216} height={216} className={cl.image} />
                </div>
                <div className={cl.middle}>
                    <h4 className={cl.name}>{product.name}</h4>
                    <div className={cl.priceWrapper}>
                        <WholesaleDiapason minWholesale={minWholesale} maxWholesale={maxWholesale}
                            currency={media.currency} classNameText={cl.price} />
                    </div>
                </div>
                <div className={cl.bottom}>
                    <QuantityMetrics heading={'Мин. Кол-во'}
                        wholesale={minWholesale}
                        classNameText={cl.quantityText}/>

                    <NavSupplier supplierId={product.ownerId ?? ''} views={[ESupplierToChatViewItem.SMALL]}/>
                </div>
            </Link>
            {/* <FavouriteAutoToSupplierButton view={ESupplierFavouriteViewItem.SMALL_FILL} className={cl.favourite} /> */}
        </section>
    )
}
