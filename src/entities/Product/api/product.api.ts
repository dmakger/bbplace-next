import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
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
                url: `/GetItems/Filter/${args?.limit}/CountPages/`,
				method: 'GET',
            })
        }),
        //GET PRODUCTS BY USER
        getProductsByUser: build.query<IProduct[], IGetProductsByUser>({
            query: ({page = PRODUCT_START_PAGE, limit = PRODUCT_BY_USER_LIMIT, userId}) => ({
                url: `/GetItems/ByUser/${userId}/${limit}/${page}`,
                method: 'GET',

            }),
        }),
        getPagesProductsByUser: build.query<number, IGetProductsByUser>({
            query: ({limit = PRODUCT_BY_USER_LIMIT, userId}) => ({
                url: `/GetItems/ByUser/${userId}/${limit}/CountPages`,
                method: 'GET',
            })
        }),
	})
})
