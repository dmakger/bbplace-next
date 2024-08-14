import { IArgsRequest } from "@/api/connection/model/request.model.api"

export const REVIEW_START_PAGE: IArgsRequest['page'] = 0
export const REVIEW_LIMIT: IArgsRequest['limit'] = 24

export const REVIEW_ARGS_REQUEST: IArgsRequest = {
    page: REVIEW_START_PAGE,
    limit: REVIEW_LIMIT,
    
}