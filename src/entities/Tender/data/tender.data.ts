import { IArgsRequest } from "@/api/model/request.model.api"

export const TENDER_START_PAGE: IArgsRequest['page'] = 0
export const TENDER_LIMIT: IArgsRequest['limit'] = 16

export const TENDER_ARGS_REQUEST: IArgsRequest = {
    page: TENDER_START_PAGE,
    limit: TENDER_LIMIT
}