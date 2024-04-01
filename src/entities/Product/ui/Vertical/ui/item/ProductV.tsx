import Image from 'next/image'
import VerticalProductImage from '@/shared/assets/img/VerticalProductImage.jpg'
import cl from './_ProductV.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { FavouriteIcon, FavouriteIconVariant, SubscribeIcon } from '@/shared/ui/Icon/index'
import { SupplierDefault } from '@/entities/Supplier/ui/Default/SupplierDefault'
import { IProductProps } from '@/entities/Product/model/props.product.model'
import { QuantityMetrics } from '@/shared/ui/QuantityMetrics/QuantityMetrics'
import { getDiapason } from '@/entities/Metrics/lib/metrics/diapason.metrics.metrics.lib'

interface ProductVProps extends IProductProps {}

export const ProductV = ({
  product,
  className
}: ProductVProps) => {

  const [minWholesale, maxWholesale] = getDiapason(product.media.wholesalePrices)

  return (
    <section className={cl.VerticalCard}>
      <div className={cl.topContainer}>
        <div className={cl.imageContainer}>
          <Image src={VerticalProductImage} alt='VerticalProductImage' className={cl.blurBackground} />
          <Image src={VerticalProductImage} alt='VerticalProductImage' className={cl.frontImage} />
          <FavouriteIcon variant={FavouriteIconVariant.IN_CIRCLE_HEART} className={cl.iconForVertCard} />
        </div>

      </div>
      <div className={cl.bottomContainer}>
        <div className={cl.mainInfo}>
          <h4 className={cl.cardTitle}>
            {product.name}
          </h4>
          <div className={cl.priceAndQuantity}>
            <p className={cl.cardPrice}>
              305,80 RUB - 9 237 RUB<span>&nbsp;/шт.</span>
            </p>
            <p className={cl.cardQuantity}>
              <QuantityMetrics heading={'Мин. Кол-во'}
                wholesale={minWholesale}
                classNameText={cl.quantityText} />
            </p>
          </div>
        </div>
        <div className={cl.bottomBlock}>
          <SupplierDefault
            id={product.ownerId}
          />
          <p className={cl.supplierInfoMobile}>
            ООО "Древние Русы"
          </p>
          <div className={cl.buttonsContainer}>
            <Button variant={ButtonVariant.BORDERED_RED_WIDE}>
              Связаться с поставщиком
            </Button>
            <SubscribeIcon />
          </div>
          <div className={cl.buttonsContainerMobile}>
            <Button variant={ButtonVariant.CLEAR}>
              Написать
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

