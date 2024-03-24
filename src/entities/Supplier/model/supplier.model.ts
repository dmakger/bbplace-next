import { ICategory } from "@/entities/Metrics/model/category.metrics.model";
import { ESupplierRole } from "../data/supplier.data";
import { IImage } from "@/shared/model/image.model";

export interface IBaseSupplier {
    country: string,
    legalName: string,
    brandName: string,
    fullName: string,
    emailSubscription: boolean,
    shortDescription: string,
    description: string,
    id: string,
    email: string,
    emailConfirmed: boolean,
    phoneNumber: string,
    roles: ESupplierRole[],
    inn: string,
    isValid: boolean
}


export interface ISupplierAPI extends IBaseSupplier {
    category: string,
    photoId: string
}


export interface ISupplier extends IBaseSupplier {
    category: ICategory[],
    photoId: IImage,
}
