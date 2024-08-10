import { IPropsProductForm } from "@/features/Form/Product/model/product.form.model";
import { IPropsCreateProduct } from "../model/props.product.model";
import { IUser } from "@/entities/Auth/model/auth.model";
import { STATUS__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/status.product.form.data";
import { ICharacteristic } from "../model/characteristic.product.model";
import { equipmentListToEquipment, expirationDateAndMetricToExpirationDate } from "@/features/Form/Product/lib/additionalInfo.product.form.lib";
import { GENDER__PRODUCT_FORM__DATA } from "@/features/Form/Product/data/gender.product.form.data copy";
import { optionToCountry } from "@/entities/Metrics/lib/option.country.metrics.lib";
import { optionToMetric } from "@/entities/Metrics/lib/option.metric.metrics.lib";
import { IMediaProduct } from "../model/media.product.model";


export const productFormToCreateProductTest = () => {
    // 1. swap country to name
    return {
        "categoryId": 335,
        "certification": false,
        "country": "Австрия",
        "characteristics": JSON.stringify({
          "brand": "123",
          "weight": "123",
          "expirationDate": "123 Недели",
          "gender": "Женский",
          "features": ["123"],
          "description": "123123",
          "composition": "123",
          "equipment": "123 123",
          "country": "Австрия",
          "weightUnits": {
            "id": 2,
            "name": "Тонны",
            "params": {
              "shortName": "т"
            }
          }
        }),
        "delivery": ["123"],
        "deliveryTime": "123",
        "isCustomDesign": true,
        "isHasTestProbe": true,
        "media": JSON.stringify({
          "attachments": ["300cf690-d2aa-4224-81e3-dbc08f358a01.jpeg"],
          "color": "123",
          "article": "123",
          "currency": {
            "id": 2,
            "name": "Российский Рубль",
            "country": "РФ",
            "code": "RUB"
          },
          "priceUnits": {
            "id": 3,
            "name": "Штуки",
            "shortName": "шт"
          },
          "wholesalePrices": [
            {
              "price": "123",
              "quantity": "123",
              "metrics": {
                "id": 3,
                "name": "Штуки",
                "shortName": "шт"
              },
              "currency": {
                "id": 2,
                "name": "Российский Рубль",
                "country": "РФ",
                "code": "RUB"
              }
            }
          ],
          "sizes": [
            {
              "size": "123",
              "sizeUnit": {
                "id": 2,
                "name": "Тонны",
                "params": {
                  "shortName": "т"
                }
              }
            }
          ]
        }),
        "name": "qweqweqwe",
        "ownerId": "",
        "packageType": "123",
        "packagingHeight": 54,
        "packagingLength": 123,
        "packagingWidth": 34,
        "paymentConditions": "123",
        "status": "Под заказ",
        "vat": 1,
        "warehouses": ["123"]
      } as IPropsCreateProduct
}


export const productFormToCreateProduct = (data: IPropsProductForm, ownerId: IUser['id']) => {
    const {main, additional} = data 
    return {
        name: main.name,
        ownerId: ownerId,
        categoryId: main.categoryId,
        country: main.country!.name,
        certification: main.hasCertificate,
        delivery: additional.delivery.map(it => it.name),
        paymentConditions: additional.paymentConditions,
        deliveryTime: additional.deliveryTime,
        packagingLength: additional.packagingLength,
        packagingWidth: additional.packagingWidth,
        packagingHeight: additional.packagingHeight,
        packageType: additional.packageType,
        vat: +additional.vat,
        isCustomDesign: true,
        isHasTestProbe: additional.isHasTestProbe,
        status: STATUS__PRODUCT_FORM__DATA.find(it => it.id === main.status.id)!.name,
        warehouses: additional.warehouses.map(it => it.name),
        media: productFormToMediaProduct(data),
        characteristics: productFormToCharacteristicProduct(data),
    } as IPropsCreateProduct
}


export const productFormToMediaProduct = (data: IPropsProductForm) => {
    const {media} = data.variation 
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
    return JSON.stringify({
        brand: additional.brand,
        weight: additional.weight,
        expirationDate: expirationDateAndMetricToExpirationDate(additional.expirationDate, additional.expirationDateMetric),
        gender: GENDER__PRODUCT_FORM__DATA.find(it => it.id === additional.gender.id)!.name,
        features: additional.features.map(it => it.name),
        description: main.description,
        composition: additional.composition,
        equipment: equipmentListToEquipment(additional.equipment.map(it => it.name)),
        country: optionToCountry(main.country!),
        weightUnits: additional.weightMetric ? optionToMetric(additional.weightMetric) : undefined,
    } as ICharacteristic)
}