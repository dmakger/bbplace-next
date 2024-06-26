import { cls } from "@/shared/lib/classes.lib"
import cl from './_MobileOrderFooter.module.scss'
import { PriceQuantity } from "@/shared/ui/PriceQuantity/PriceQuantity"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model"
import { IProduct } from "@/entities/Product/model/product.model"
import { ButtonSize } from "@/shared/ui/Button/model/button.model"

interface IMobileOrderFooter {
    className?: string,
    firstStart?: string
    supplierId: string
    product?: IProduct,
    wholesalePrices: IWholesale[]
    isTop?: boolean,
    classNamePriceQuantity?: string
}

export const MobileOrderFooter = ({
    className,
    firstStart = 'За ',
    supplierId,
    wholesalePrices,
    isTop = false,
    classNamePriceQuantity
}: IMobileOrderFooter) => {
  

    return (
        <div className={cls(isTop ? cl.topMobileOrderFooter : cl.MobileOrderFooter, cl.block, className)} >
            <PriceQuantity
                wholesales={wholesalePrices ?? []}
                className={cls(cl.priceQuantity, classNamePriceQuantity)}
                classNameWholesaleBlock={cl.wholesaleBlock}
                firstStart={firstStart}
                classNameQuantity={cl.quantity}
                classNamePrice={cl.price}
                classNameOneItem={cl.onRequest} />
                
            <div className={cl.buttonContainer}>
                <Button variant={ButtonVariant.BACKGROUND_RED}
                    size={ButtonSize.Medium}
                    classNameLink={cl.button}
                    href={DASHBOARD_PAGES.CURRENT_CHAT(supplierId ?? '')}
                    title="Заказать" />
            </div>
                
        </div>
    )
}
