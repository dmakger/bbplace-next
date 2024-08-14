import { IArgsRequest } from "@/api/connection/model/request.model.api"

//BASE
export interface IBaseReview {
    id: number
    ownerId: string
    score: number
    text: string
    attachments: string
    createdAt: string
}


export interface IBaseReviewsPagesRequest {
    limit: number
}

//SUPPLIER
export interface ISellerReview extends IBaseReview {
    sellerId: string
}

export interface ISellerReviewsRequest extends IArgsRequest{
    supplierId: string
}

export interface ISellerReviewsPagesRequest extends IBaseReviewsPagesRequest {
    supplierId: string
}

//PRODUCT
export interface IProductReview extends IBaseReview {
    response: IReviewResponse
}

export interface IProductReviewRequest extends IArgsRequest {
    itemId: string
}

export interface IProductReviewsPagesRequest extends IBaseReviewsPagesRequest {
    itemId: string
}

export interface IReviewResponse {
    reviewId: number,
    text: string,
    attachments: string,
    createdAt: string
}