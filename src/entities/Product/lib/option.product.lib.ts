import { IOption } from "@/shared/model/option.model";
import { IProduct } from "../model/product.model";
import { MAIN_PAGES } from "@/config/pages-url.config";

export const productListToOptionList = (productList: IProduct[]) => {
    return productList.map(it => productToOption(it))
}

export const productToOption = (product: IProduct) => {
    return {
        id: product.id,
        name: product.media.color,
        params: {
            image: product.media.attachments[0],
            href: MAIN_PAGES.CURRENT_PRODUCT(product.id),
        },
    } as IOption
}