import { cls } from "@/shared/lib/classes.lib"
import cl from './_MainInfoProduct.module.scss'
import { IProduct } from "@/entities/Product/model/product.model"
import { IOption } from "@/shared/model/option.model"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { BlockInfoProduct } from "../BlockInfoProduct/BlockInfoProduct"
import { productListToOptionList } from "@/entities/Product/lib/option.product.lib"
import { OptionList } from "@/shared/ui/Option/ui/List/OptionList"
import { Button, ButtonVariant } from "@/shared/ui/Button"

interface IMainInfoProduct {
    className?: string,
    product: IProduct,
    inView?: boolean,
    productSizes: IOption[],
    productListGroup: IProduct[],
    choosenSize: IOption[],
    chooseSize: Function
}

export const MainInfoProduct = ({
    className,
    product,
    inView,
    productSizes,
    productListGroup,
    choosenSize,
    chooseSize
}: IMainInfoProduct) => {    
    return (
        <div className={cls(cl.MainInfoProduct, className)}>
            <BlockInfoProduct product={product} className={cls(cl.wholesaleProduct, inView ? cl.hidden : '')} />
            <OptionList title="Цвет: "
                optionList={productListToOptionList(productListGroup)}
                activeIds={[product.id]}
                isOnHover />
            {productSizes.length > 0 && <OptionList title="Размер: "
                optionList={productSizes}
                activeIds={[choosenSize[0]?.id]}
                onClickItem={chooseSize}
                classNameItem={cl.optionItem}
                isSizes
            />}
            <div className={cl.buttonContainer} >
                <Button variant={ButtonVariant.BACKGROUND_RED}
                    href={DASHBOARD_PAGES.CURRENT_CHAT(product.ownerId ?? '')}
                    title="Заказать" />
            </div>
        </div>
    )
}
