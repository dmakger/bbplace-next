import { IArgsRequest } from "@/api/connection/model/request.model.api"
import { REVIEW_ARGS_REQUEST } from "../data/review.data"

export const getArgsReview = (args?: IArgsRequest) => {
    return args ?? REVIEW_ARGS_REQUEST
}