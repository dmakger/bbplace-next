import { IArgsRequest } from "@/api/api/model/request.model.api"
import { ISupplierAPI } from "../model/supplier.model"

export enum ESupplierRole {
    BUYER = "buyer",
    SUPPLIER = "supplier",
}

export const PREFIX_SUPPLIER_VIEW = "supplier"

export enum ESupplierView {
    NONE = `none__${PREFIX_SUPPLIER_VIEW}`,
    SMALL = `small__${PREFIX_SUPPLIER_VIEW}`,
    LARGE_GRAY = `largeGray__${PREFIX_SUPPLIER_VIEW}`,
    LARGE_WHITE = `largeWhite__${PREFIX_SUPPLIER_VIEW}`,
    LARGE_WHITE_FOR_DESCRIPTION_PAGE = `largeWhiteForDescriptionPage__${PREFIX_SUPPLIER_VIEW}`

}

export enum ESupplierAxis {
    HORIZONTAL = `horizontal__${PREFIX_SUPPLIER_VIEW}`,
    VERTICAL = `vertical__${PREFIX_SUPPLIER_VIEW}`,
}


export const SUPPLIER_START_PAGE: IArgsRequest['page'] = 0
export const SUPPLIER_LIMIT: IArgsRequest['limit'] = 24

export const SUPPLIER_ARGS_REQUEST: IArgsRequest = {
    page: SUPPLIER_START_PAGE,
    limit: SUPPLIER_LIMIT
}

export const INITIAL_SUPPLIER_DATA: ISupplierAPI = {
    legalName: '',
    brandName: '',
    fullName: '',
    shortDescription: '',
    description: '',
    id: '',
    email: '',
    phoneNumber: '',
    inn: '',
    isValid: false,
    category: '',
    country: '',
    photoId: '',
    roles: [],
    emailConfirmed: true,
    emailSubscription: false
}