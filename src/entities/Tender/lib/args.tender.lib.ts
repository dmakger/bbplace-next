import { IArgsRequest } from "@/api/api/model/request.model.api"
import { TENDER_ARGS_REQUEST } from "../data/tender.data"

export const getArgsTender = (args?: IArgsRequest) => {
    return args ?? TENDER_ARGS_REQUEST
}