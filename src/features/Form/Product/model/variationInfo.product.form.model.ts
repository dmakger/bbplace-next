import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { IOption } from "@/shared/model/option.model";

/**
 * ##### ФОРМА ТОВАРА  
 * Данные из группы `Вариация товара`
 */
export interface IPropsVariationInfoProductForm {
    media: IMediaProduct
    customs: IOption[]
}
