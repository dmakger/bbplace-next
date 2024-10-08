import { IPropsProductForm } from "@/features/Form/Product/model/product.form.model";
import { IPropsCreateProduct, IPropsUpdateProduct } from "../model/props.product.model";
import { IUser } from "@/entities/Auth/model/auth.model";
import { STATUS__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/status.product.form.data";
import { ICharacteristic } from "../model/characteristic.product.model";
import { equipmentListToEquipment, expirationDateAndMetricToExpirationDate } from "@/features/Form/Product/lib/additionalInfo.product.form.lib";
import { GENDER__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/gender.product.form.data copy";
import { optionToCountry } from "@/entities/Metrics/lib/option.country.metrics.lib";
import { optionToMetric } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { IMediaProduct } from "../model/media.product.model";
import { CREATE_DRAFT_PRODUCT_TEST, CREATE_PRODUCT_TEST } from "../test/create.form.product.test";


export const productFormToCreateProductTest = (isDraft: boolean) => {
    const data = isDraft ? CREATE_DRAFT_PRODUCT_TEST : CREATE_PRODUCT_TEST
    return {
        ...data,
        media: JSON.stringify(data.media),
        characteristics: JSON.stringify(data.characteristics),
    } as IPropsUpdateProduct | IPropsCreateProduct
}

/**
 * Является `data` типа `IPropsUpdateProduct | IPropsCreateProduct` черновиком?  
 * Черновиком является:   
 * 1. Если нет изображений: `media.attachments.length === 0`
 */
export const isDraftByPropsCreateUpdateProduct = (data: IPropsUpdateProduct | IPropsCreateProduct) => {
    return (JSON.parse(data.media) as IMediaProduct).attachments.length === 0
}


export const propsUpdateToCreateProduct = (updateProduct: IPropsUpdateProduct, propsProductForm: IPropsProductForm): IPropsCreateProduct | undefined => {
    if (!propsProductForm.main || !propsProductForm.main.form) return 
    const {form: mainForm} = propsProductForm.main

    return {
        ...updateProduct,
        categoryId: mainForm.categoryId,
    }
}


export const productFormToCreateOrEditProduct = (data: IPropsProductForm, ownerId: IUser['id'], propsToEdit?: boolean ): IPropsUpdateProduct | IPropsCreateProduct | undefined => {
    let {main, additional, variation} = data
    if (!main || !additional || !variation || !main.form || !additional.form || !variation.form) return 
    const props = {
        name: main.form.name,
        ownerId: ownerId,
        country: main.form.country!.name,
        certification: main.form.hasCertificate,
        delivery: additional.form.delivery.map(it => it.name),
        paymentConditions: additional.form.paymentConditions,
        deliveryTime: additional.form.deliveryTime,
        packagingLength: additional.form.packagingLength,
        packagingWidth: additional.form.packagingWidth,
        packagingHeight: additional.form.packagingHeight,
        packageType: additional.form.packageType,
        vat: +additional.form.vat,
        isCustomDesign: true,
        isHasTestProbe: additional.form.isHasTestProbe,
        status: STATUS__PRODUCT_FORM__DATA.find(it => it.id === main?.form?.status.id)!.name,
        warehouses: additional.form.warehouses.map(it => it.name),
        media: productFormToMediaProduct(data),
        characteristics: productFormToCharacteristicProduct(data),
    } as IPropsUpdateProduct
    if (propsToEdit) 
        return props
    return {...props, categoryId: main.form.categoryId } as IPropsCreateProduct
}


export const productFormToMediaProduct = (data: IPropsProductForm) => {
    if (!data.variation || !data.variation.form) return 
    const {media} = data.variation.form
    return JSON.stringify({
        attachments: media.attachments,
        color: media.color,
        article: media.article,
        currency: media.currency,
        priceUnits: media.priceUnits,
        wholesalePrices: media.wholesalePrices,
        sizes: media.sizes,
    } as IMediaProduct)
}


export const productFormToCharacteristicProduct = (data: IPropsProductForm) => {
    const {main, additional} = data 
    if (!main || !additional || !main.form || !additional.form) return 
    return JSON.stringify({
        brand: additional.form.brand,
        weight: additional.form.weight,
        expirationDate: expirationDateAndMetricToExpirationDate(additional.form.expirationDate, additional.form.expirationDateMetric),
        gender: GENDER__PRODUCT_FORM__DATA.find(it => it.id === additional.form?.gender.id)!.name,
        features: additional.form.features.map(it => it.name),
        description: main.form.description,
        composition: additional.form.composition,
        equipment: equipmentListToEquipment(additional.form.equipment.map(it => it.name)),
        country: optionToCountry(main.form.country!),
        weightUnits: additional.form.weightMetric ? optionToMetric(additional.form.weightMetric) : undefined,
    } as ICharacteristic)
}