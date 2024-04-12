import { IArgsRequest } from "@/api/model/request.model.api"

export const PRODUCT_START_PAGE: IArgsRequest['page'] = 0
export const PRODUCT_LIMIT: IArgsRequest['limit'] = 30
// export const PRODUCT_LIMIT: IArgsRequest['limit'] = 3

export const PRODUCT_ARGS_REQUEST: IArgsRequest = {
    page: PRODUCT_START_PAGE,
    limit: PRODUCT_LIMIT
}