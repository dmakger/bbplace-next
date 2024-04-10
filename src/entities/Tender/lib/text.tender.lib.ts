import { getTextByNumber } from "@/shared/lib/text.lib"

export const getTenderTextByNumber = (n: number) => {
    return getTextByNumber(n, "тендеров", "тендер", "тендера")
}