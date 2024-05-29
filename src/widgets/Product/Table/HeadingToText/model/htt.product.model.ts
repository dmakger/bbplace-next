import { ICountry } from "@/entities/Metrics/model/country.metrics.model";
import { IProduct } from "@/entities/Product/model/product.model";
import { IOption } from "@/shared/model/option.model";

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
