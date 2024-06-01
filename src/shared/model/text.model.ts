import { ReactNode } from "react"

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
import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { IOption } from "@/shared/model/option.model";
import { ISupplier } from "@/entities/Supplier/model/supplier.model";

export interface IGetDataHeadingToTextProductTable{
    product: IProduct,
    isCreatedAtAndReviews?: boolean,
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

//SUPPLIER
export enum IGetDataHeadingToTextSupplierTableVariant{
    PRODUCT_PAGE = 'product-page',
    SUPPLIER_PAGE = 'supplier-page'
}
export interface IGetDataHeadingToTextSupplierTable {
    variant?: IGetDataHeadingToTextSupplierTableVariant
    supplier: ISupplier,
    supplierRating: number,
    supplierReviews: number,
    isCountryNeeded?: boolean
}
