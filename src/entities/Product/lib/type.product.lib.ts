import { EProductType } from "../data/type.product.data";

/**
 * Перевод `строки` в  `EProductType`
 */
export const toProductType = (type?: string | EProductType): EProductType => {
    if (type === undefined) return EProductType.Public
    if (typeof type !== "string")
        return type
    return type.toLocaleLowerCase() === EProductType.Public ? EProductType.Public : EProductType.Draft
}
