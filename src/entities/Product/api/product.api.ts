import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { IGetProductsByUser, IProduct, IProductAPI } from "../model/product.model";
import { IArgsRequest } from "@/api/model/request.model.api";
import { getArgsProduct } from "../lib/args.product.lib";
import { getURL } from "@/api/request";
import { PRODUCT_BY_USER_LIMIT, PRODUCT_START_PAGE } from "../data/product.data";


export const ProductAPI = createApi({
    reducerPath: 'productAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'item/api/Items'
    }),
    endpoints: (build) => ({
        //ITEMS CATALOG
        getProducts: build.query<IProductAPI[], IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetItems/Filter/`, getArgsProduct(args)),
                method: 'GET',
            })
        }),

        getCountProducts: build.query<number, IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetItems/Filter/${args?.limit}/CountPages/`, { params: args?.params }),
                method: 'GET',
            })
        }),
        getProductsByGroup: build.query<IProductAPI[], string | number>({
            query: (groupId) => ({
                url: `/GetItems/${groupId}`,
                method: 'GET',
            })
        }),

        // DETAIL
        getProduct: build.query<IProductAPI, number | string>({
            query: (itemId) => ({
                url: `/GetItem/${itemId}`,
                // responseHandler: parseItem,
            }),
            // providesTags: result => ['Item']
        }),
        deleteProduct: build.mutation<IProductAPI, number | string>({
            query: (itemId) => ({
                url: `/DeleteItem/${itemId}`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: {}
            }),
        }),

        //GET PRODUCTS BY USER
        getProductsByUser: build.query<IProductAPI[], IGetProductsByUser>({
            query: ({ page = PRODUCT_START_PAGE, limit = PRODUCT_BY_USER_LIMIT, userId }) => ({
                url: `/GetItems/ByUser/${userId}/${limit}/${page}`,
                method: 'GET',

            }),
        }),
        getPagesProductsByUser: build.query<number, IGetProductsByUser>({
            query: ({ limit = PRODUCT_BY_USER_LIMIT, userId }) => ({
                url: `/GetItems/ByUser/${userId}/${limit}/CountPages`,
                method: 'GET',
            })
        }),
        //DRAFT
        deleteDraft: build.mutation<void, number | string>({
            query: (draftId) => ({
                url: `/DeleteItemDraft/${draftId}`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: {}
            }),
        })
    })

})
