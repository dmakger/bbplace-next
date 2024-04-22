import { PRODUCT_PARAMS } from "@/config/params/product.params.config";
import { ENTITY_PARAMS } from "../data/params.data";
import { CORE_PARAMS } from "@/config/params/core.params.config";

export const getSortKey = (entity: ENTITY_PARAMS) => {
    if (entity === ENTITY_PARAMS.PRODUCT)
        return PRODUCT_PARAMS.SORT
    return CORE_PARAMS.SORT
}