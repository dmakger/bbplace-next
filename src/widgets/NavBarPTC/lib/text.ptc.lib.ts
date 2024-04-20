import { getProductTextByNumber } from "@/entities/Product/lib/text.product.lib";
import { EPTC } from "../model/ptc.model";
import { getTenderTextByNumber } from "@/entities/Tender/lib/text.tender.lib";
import { getSupplierTextByNumber } from "@/entities/Supplier/lib/text.supplier.lib";
import { getResultTextByNumber } from "@/shared/lib/text.lib";

// Вернет текст отформатированный в правильном ввиде
// Например, когда передается {view} как {PRODUCT}:
// Если 11 => "продуктов"
// Если 1 => "продукт"
// Если 2 => "продукта"
export const getPTCTextByNumber = (n: number, view?: EPTC) => {
    if (view === EPTC.PRODUCT)
        return getProductTextByNumber(n)
    if (view === EPTC.TENDER)
        return getTenderTextByNumber(n)
    if (view === EPTC.SUPPLIER)
        return getSupplierTextByNumber(n)
    return getResultTextByNumber(n)
}

