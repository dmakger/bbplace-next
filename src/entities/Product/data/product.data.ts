import { IArgsRequest } from "@/api/model/request.model.api"

export const PRODUCT_START_PAGE: IArgsRequest['page'] = 0
export const PRODUCT_LIMIT: IArgsRequest['limit'] = 16

export const PRODUCT_ARGS_REQUEST: IArgsRequest = {
    page: PRODUCT_START_PAGE,
    limit: PRODUCT_LIMIT
}