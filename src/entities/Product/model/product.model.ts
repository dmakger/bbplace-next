import { IMediaProduct } from "./media.product.model"
import { ICharacteristic } from "./characteristic.product.model"
import { IArgsRequest } from "@/api/model/request.model.api"

interface IBaseProduct {
    id: number
    groupId: number | null
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
    createdAt: string
    deletedAt: string | null
}



export interface IProductAPI extends IBaseProduct {
    media: string
    characteristics: string
}

export interface IProduct extends IBaseProduct {
    media: IMediaProduct
    characteristics: ICharacteristic
}


export interface IGetProductsByUser extends IArgsRequest{
    userId: string
}

export interface IGroupData {
    productId: number,
    groupId: number
}