import { IMediaProduct } from "./media.product.model"
import { ICharacteristic } from "./characteristic.product.model"
import { IArgsRequest } from "@/api/model/request.model.api"
import { ICategory } from "@/entities/Metrics/model/category.metrics.model"


export interface IBaseProduct {
    name: string | null
    ownerId: string | null
    categoryId:	number
    country: string | null
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


export interface IBaseWIdsProduct extends IBaseProduct{
    id: number
    groupId: number | null
    createdAt: string
    deletedAt: string | null
}


export interface IProductAPI extends IBaseWIdsProduct {
    media: string
    characteristics: string
}

export interface IProduct extends IBaseWIdsProduct {
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