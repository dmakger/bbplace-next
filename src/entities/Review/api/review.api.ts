import { options } from "@/api/interceptors";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { IProductReview, IProductReviewRequest, ISellerReview, ISellerReviewsPagesRequest, ISellerReviewsRequest } from "../model/review.model";


export const ReviewAPI = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'review/api/Reviews'
    }),
    endpoints: (build) => ({
        //SUPPLIER
        getSupplierScore: build.query<number, string>({
            query: (supplierId) => ({
                url: `/GetSellerReviewAvgScore/${supplierId}`,
                method: 'GET'
            })
        }),
        //GET SUPPLIER REVIEWS
        getSellerReviews: build.query<ISellerReview[], ISellerReviewsRequest>({
            query: ({ supplierId, limit, page }) => ({
                url: `/GetSellerReviews/OrderByDate/DESC/${supplierId}/${limit}/${page}`,
            })
        }),
        getSellerReviewsPages: build.query<number, ISellerReviewsPagesRequest>({
            query: ({ supplierId, limit }) => ({
                url: `/GetSellerReviews/OrderByDate/DESC/${supplierId}/${limit}/CountPages`
            })
        }),
        //PRODUCT
        getProductAvgScore: build.query<number, string>({
            query: (itemId) => ({
                url: `/GetItemReviewAvgScore/${itemId}`,
                method: 'GET'
            })
        }),
        //GET PRODUCT REVIEWS
        getProductReviews: build.query<IProductReview[], IProductReviewRequest>({
            query: ({itemId, limit, page}) => ({
                url: `/GetItemReviews/Filter/${limit}/${page}?ItemId=${itemId}`,
            })
        }),
        getProductReviewsPages: build.query<number, IProductReviewRequest>({
            query: ({ itemId, limit }) => ({
                url: `/GetItemReviews/Filter/${itemId}/${limit}/CountPages`
            })
        }),
    })
})