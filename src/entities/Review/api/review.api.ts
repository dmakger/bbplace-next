import { options } from "@/api/interceptors";
import {createApi} from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ISellerReview, ISellerReviewsPagesRequest, ISellerReviewsRequest } from "../model/review.model";


export const ReviewAPI = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'review/api/Reviews'
    }),
    endpoints: (build) => ({
        //SCORE
        getSupplierScore: build.query<number, string>({
            query: (supplierId) => ({
                url: `/GetSellerReviewAvgScore/${supplierId}`,
                method: 'GET'
            })
        }),
        //GET SELLER REVIEWS
        getSellerReviews: build.query<ISellerReview[], ISellerReviewsRequest>({
            query: ({supplierId, limit, page}) => ({
                url: `/GetSellerReviews/OrderByDate/DESC/${supplierId}/${limit}/${page}`,
            })
        }),
        getSellerReviewsPages: build.query<number, ISellerReviewsPagesRequest>({
            query: ({supplierId, limit}) => ({
                url: `/GetSellerReviews/OrderByDate/DESC/${supplierId}/${limit}/CountPages`
            })
        }),
    })
})