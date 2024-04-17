export interface ISellerReview {
    id: number
    ownerId: string
    sellerId: string
    score: number
    text: string
    attachments: string
    createdAt: string
}

export interface ISellerReviewsRequest{
    supplierId: string
    limit: number
    page?: number
}

export interface ISellerReviewsPagesRequest {
    supplierId: string
    limit: number
}