import { IPropsMainInfoProductForm } from "./mainInfo.product.form.model";
import { IPropsAdditionalInfoProductForm } from "./additionalInfo.product.form.model";
import { IPropsVariationInfoProductForm } from "./variationInfo.product.form.model";

/**
 * ##### ФОРМА ТОВАРА  
 * Объединение под-форм:   
 * `IPropsMainInfoProductForm`, `IPropsAdditionalInfoProductForm`, `IPropsVariationInfoProductForm`
 */
export interface IPropsProductForm {
    main?: IFormInfo<IPropsMainInfoProductForm>,
    additional?: IFormInfo<IPropsAdditionalInfoProductForm>,
    variation?: IFormInfo<IPropsVariationInfoProductForm>,
}

export interface IFormInfo<T> {
    isValid: boolean,
    form?: T,
}
