import { ICountry } from "@/entities/Metrics/model/country.metrics.model"
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model"
import { ISelected } from "@/entities/Metrics/model/selected.metrics.model"

export type IBaseCharacteristic = {
    brand: string
    weight?: number
    expirationDate: string
    gender: string
    features: string[]
    description: string
    composition: string
    equipment: string
}


export interface ICharacteristicAPI extends IBaseCharacteristic {
    country: string
    weightUnits: string
}


export interface ICharacteristic extends IBaseCharacteristic {
    country: ICountry
    weightUnits?: IMetrics
}