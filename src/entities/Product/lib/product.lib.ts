import { ICharacteristic } from "../model/characteristic.product.model";
import { IMediaProduct } from "../model/media.product.model";
import { IProduct, IProductAPI } from "../model/product.model";


// PRODUCT API => PRODUCT 
export const productApiToProduct = (productAPI: IProductAPI): IProduct => {
    const media = JSON.parse(productAPI.media) as IMediaProduct
    const characteristics = JSON.parse(productAPI.characteristics) as ICharacteristic
    
    return {
        ...productAPI, 
        media, 
        characteristics,
    }
}


// PRODUCT => PRODUCT API
export const productToProductAPI = (product: IProduct): IProductAPI => {
    const media = JSON.stringify(product.media)
    const characteristics = JSON.stringify(product.characteristics)
    
    return {
        ...product, 
        media, 
        characteristics,
    }
}