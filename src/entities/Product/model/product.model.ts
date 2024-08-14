import { IMediaProduct } from "./media.product.model"
import { ICharacteristic } from "./characteristic.product.model"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"
import { ICountry } from "@/entities/Metrics/model/country.metrics.model"
import { IArgsRequest } from "@/api/api/model/request.model.api"


export interface IBaseProduct {
    name: string | null
    ownerId: string | null
    certification: boolean
    delivery: string[] | null
    paymentConditions: string | null
    deliveryTime: string | null
    packagingLength: number
    packagingWidth: number
    packagingHeight: number
    packageType: string | null
    vat: number
    isCustomDesign:	boolean
    isHasTestProbe:	boolean
    status: string | null
    warehouses:	string[] | null
}

export interface IBaseWCategoryProduct extends IBaseProduct {
    categoryId:	number
}



export interface IBaseWIdsProduct extends IBaseWCategoryProduct{
    id: number
    groupId: number | null
    createdAt: string
    deletedAt: string | null
}


export interface IProductAPI extends IBaseWIdsProduct {
    country: string | null
    media: string
    characteristics: string
}

export interface IProduct extends IBaseWIdsProduct {
    country?: ICountry
    media: IMediaProduct
    characteristics: ICharacteristic
    category?: ICategory
}


export interface IGetProductsByUser extends IArgsRequest{
    userId: string
}

export interface IGroupData {
    productId: number,
    groupId: number
}