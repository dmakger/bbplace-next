import { IProduct } from "@/entities/Product/model/product.model";
import { IPropsMainInfoProductForm } from "../model/mainInfo.product.form.model";
import { READY_STATUS__PRODUCT_FORM__DATA, STATUS__PRODUCT_FORM__DATA } from "../data/status.product.form.data";
import { countryToOption } from "@/entities/Metrics/lib/option.country.metrics.lib";
import { IPropsAdditionalInfoProductForm } from "../model/additionalInfo.product.form.model";
import { GENDER__PRODUCT_FORM__DATA, UNISEX_GENDER__PRODUCT_FORM__DATA } from "../data/gender.product.form.data copy";
import { equipmentToEquipmentList, expirationDateToExpirationDateAndMetric } from "./additionalInfo.product.form.lib";
import { metricToOption } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { IPropsVariationInfoProductForm } from "../model/variationInfo.product.form.model";
import { IFormInfo, IPropsProductForm } from "../model/product.form.model";
import { processDeliveryOption, processEquipmentOption, processFeaturesOption, processWarehousesOption } from "./process.additionalInfo.product.form.lib";
import { IOption } from "@/shared/model/option.model";
import { ICategory } from "@/entities/Metrics/model/category.metrics.model";

export const isValidPropsProductForm = (formData: IPropsProductForm) => {
    const {main, additional, variation} = formData
    // return main && additional && variation 
    //     && main.isValid && additional.isValid && variation.isValid
    return main && additional && variation 
        && main.isValid && variation.isValid
}


export const getEmptyFormInfo = <T>(): IFormInfo<T> => {
    return {
        isValid: false,
        form: undefined
    }
}

export const productToNewPropsProductForm = (categoryId: ICategory['id']): IPropsProductForm => {
    return {
        main: {
            isValid: false,
            form: {
                categoryId,
            },
        } as IFormInfo<IPropsMainInfoProductForm>,
        additional: getEmptyFormInfo<IPropsAdditionalInfoProductForm>(),
        variation: getEmptyFormInfo<IPropsVariationInfoProductForm>(),
    }
}



export const productToPropsProductForm = (product: IProduct): IPropsProductForm => {
    return {
        main: {
            isValid: true,
            form: productToPropsMainProductForm(product),
        } as IFormInfo<IPropsMainInfoProductForm>,
        additional: {
            isValid: true,
            form: productToPropsAdditionalProductForm(product),
        } as IFormInfo<IPropsAdditionalInfoProductForm>,
        variation: {
            isValid: true,
            form: productToPropsMediaProductForm(product),
        } as IFormInfo<IPropsVariationInfoProductForm>,
    }
}


export const productToPropsMainProductForm = (product: IProduct): IPropsMainInfoProductForm => {
    const status = STATUS__PRODUCT_FORM__DATA.find(it => it.name === product.status)
    return {
        name: product.name!,
        categoryId: product.categoryId,
        status: status ?? READY_STATUS__PRODUCT_FORM__DATA,
        hasCertificate: product.certification,
        country: product.country ? countryToOption(product.country) : undefined,
        description: product.characteristics.description,
    }
}


export const productToPropsAdditionalProductForm = (product: IProduct): IPropsAdditionalInfoProductForm => {
    const _expirationDate = expirationDateToExpirationDateAndMetric(product.characteristics.expirationDate)
    // const {expirationDate, expirationDateMetric} = expirationDateToExpirationDateAndMetric(product.characteristics.expirationDate)
    const delivery = (product.delivery ?? []).map(it => processDeliveryOption({delivery: it})).filter(it => it !== undefined) as IOption[]
    const warehouses = (product.warehouses ?? []).map(it => processWarehousesOption({warehouses: it})).filter(it => it !== undefined) as IOption[]
    const weightUnits = product.characteristics.weightUnits ? metricToOption(product.characteristics.weightUnits) : undefined
    const features = (product.characteristics.features ?? []).map(it => processFeaturesOption({features: it})).filter(it => it !== undefined) as IOption[]
    const equipment = equipmentToEquipmentList(product.characteristics.equipment)
    const equipmentOptionList = equipment.map(it => {
        const lastSpaceIndex = it.lastIndexOf(' ');
        const text = it.substring(0, lastSpaceIndex);
        const amount = it.substring(lastSpaceIndex + 1);

        return processEquipmentOption({equipmentText: text, equipmentAmount: amount})
    }).filter(it => it !== undefined) as IOption[]

    return {
        packageType: product.packageType ?? undefined,
        delivery: delivery,
        paymentConditions: product.paymentConditions ?? undefined,
        deliveryTime: product.deliveryTime ?? undefined,
        packagingLength: product.packagingLength,
        packagingWidth: product.packagingWidth,
        packagingHeight: product.packagingHeight,
        vat: !!product.vat,
        isHasTestProbe: product.isHasTestProbe,
        warehouses: warehouses,
        brand: product.characteristics.brand,
        gender: GENDER__PRODUCT_FORM__DATA.find(it => it.name === product.characteristics.gender) ?? UNISEX_GENDER__PRODUCT_FORM__DATA,
        expirationDate: _expirationDate ? _expirationDate.expirationDate : '',
        expirationDateMetric: _expirationDate ? _expirationDate.expirationDateMetric : undefined,
        weight: product.characteristics.weight,
        weightMetric: weightUnits,
        features: features,
        composition: product.characteristics.composition,
        equipment: equipmentOptionList,
    }
}


export const productToPropsMediaProductForm = (product: IProduct): IPropsVariationInfoProductForm => {
    return {
        media: product.media
    }
}