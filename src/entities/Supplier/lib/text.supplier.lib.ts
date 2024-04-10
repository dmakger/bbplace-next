import { getTextByNumber } from "@/shared/lib/text.lib"

export const getSupplierTextByNumber = (n: number) => {
    return getTextByNumber(n, "поставщиков", "поставщик", "поставщика")
}