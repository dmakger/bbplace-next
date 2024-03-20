import { ISelected } from "@/entities/Metrics/model/selected.metrics.model"

export type ICharacteristic = {
    brand: string
    country: string
    weight: number
    weightUnits: string
    expirationDate: string
    gender: ISelected | null
    features: string[]
    description: string
    composition: string
    equipment: string
}