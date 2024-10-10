import { ReactNode } from "react"
import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { IOption } from "@/shared/model/option.model";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";
import { ICommonTender } from "@/entities/Tender/model/tender.model";

export interface IHeadingToText {
    heading?: string
    body: string | ReactNode
    unit?: string
}

export enum EHeadingToTextVariants {
    ROW = 'row',
    COLUMN = 'column'
}

//PRODUCT

export interface IGetDataHeadingToTextProductTable{
    product: IProduct,
    isDetailedPageHeader?: boolean,
    itemRating?: number,
    itemReviews?: number
}


export interface IGetCharacteristic{
    characteristic: string,
    list: ICountry[] | IOption[]
}


export interface IGetDataHeadingToTextProductMainTable {
    product: IProduct,
    selectedCountry: string,
    selectedWeightUnit: string
}

//TENDER
export interface IGetDataTenderInfo{
    tender: ICommonTender,
    isCreatedAt?: boolean
}

//SUPPLIER
export enum IGetDataHeadingToTextSupplierTableVariant{
    PRODUCT_PAGE = 'product-page',
    SUPPLIER_PAGE = 'supplier-page',
    SUPPLIER_ITEM = 'supplier-item'
}

export interface IGetDataHeadingToTextSupplierTable {
    variant?: IGetDataHeadingToTextSupplierTableVariant
    supplier: ISupplier,
    supplierRating: number,
    supplierReviews: number,
    isCountryNeeded?: boolean
}
