import { IArgsRequest } from "@/api/api/model/request.model.api"
import { PRODUCT_ARGS_REQUEST } from "../data/product.data"

export const getArgsProduct = (args?: IArgsRequest) => {
    return args ?? PRODUCT_ARGS_REQUEST
}