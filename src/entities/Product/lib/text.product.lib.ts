import { getTextByNumber } from "@/shared/lib/text.lib"

export const getProductTextByNumber = (n: number) => {
    return getTextByNumber(n, "товаров", "товар", "товара")
}