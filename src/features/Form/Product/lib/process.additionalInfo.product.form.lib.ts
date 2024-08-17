import { generateId } from "@/shared/lib/generateId.lib"
import { IOption } from "@/shared/model/option.model"

export const processDeliveryOption = (tempDataStorage: Record<string, any>) => {
    const value = tempDataStorage.delivery
    return !value 
        ? undefined 
        : { id: generateId(), name: value} as IOption
}

export const processWarehousesOption = (tempDataStorage: Record<string, any>) => {
    const value = tempDataStorage.warehouses
    return !value 
        ? undefined 
        : { id: generateId(), name: value} as IOption
}

export const processFeaturesOption = (tempDataStorage: Record<string, any>) => {
    const value = tempDataStorage.features
    return !value 
        ? undefined 
        : { id: generateId(), name: value} as IOption
}

export const processEquipmentOption = (tempDataStorage: Record<string, any>) => {
    const equipmentText = tempDataStorage.equipmentText
    const equipmentAmount = tempDataStorage.equipmentAmount
    return !equipmentText || !equipmentAmount 
        ? undefined 
        : { id: generateId(), name: `${equipmentText} ${equipmentAmount}`} as IOption
}