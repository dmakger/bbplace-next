import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model";

export const getDiapasonQuantity = (wholesales: IWholesale[], firstStart: string | undefined = "от ") => {
    if (wholesales.length === 0)
        return []
    const data: string[] = []
    
    if (wholesales.length === 1)
        return [`${firstStart}${wholesales[0].quantity}`]
    for (let i = 1; i < wholesales.length; i++) {
        data.push(`${wholesales[i-1].quantity}-${wholesales[i].quantity}`)
    }
    data.push(`от ${wholesales[wholesales.length-1].quantity+1}`)
    return data
}