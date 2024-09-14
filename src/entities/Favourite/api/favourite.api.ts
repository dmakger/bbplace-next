import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { options } from "@/api/interceptors";
import { getHeaderAuthorization, getHeaderAuthorizationIfExists } from "@/entities/Auth/lib/auth-token.lib";
import { IProductAPI } from "@/entities/Product/model/product.model";
import { IPurchaseTender, IPurchaseTenderAPI, ISaleTender, ISaleTenderAPI } from "@/entities/Tender/model/tender.model";
import { IFavouriteListRequest, IFavouriteRequest } from "../model/favourite.model";
import { it } from "node:test";
import { isFavouriteViewSupplier } from "@/entities/Supplier/lib/boolean.supplier.lib";

export const FavouriteAPI = createApi({
	reducerPath: 'favouriteAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'favorites/api/Favorites'
	}),
	endpoints: (build) => ({

        // ======={ POST }=======
        addFavourite: build.mutation<void, IFavouriteRequest>({
            query: (body) => ({
                url: '/AddFavorite',
                method: 'POST',
                body,
                headers: getHeaderAuthorizationIfExists(),
            }),
        }),
        deleteFavourite: build.mutation<void, IFavouriteRequest>({
            query: (body) => ({
                url: '/DeleteFavorite',
                method: 'POST',
                body,
                headers: getHeaderAuthorizationIfExists(),
            }),
        }),

        // ======={ GETTERS }=======
        getFavouriteProducts: build.query<IProductAPI[], void>({
            query: () => ({
                url: `/GetFavorites/Items`,
                method: 'GET',
                headers: getHeaderAuthorizationIfExists(),
                responseHandler: async (response) => {
                    const data = await response.json() as IProductAPI[];
                    return data.map(it => ({...it, isFavorite: true}))
                }
            }),
        }),
        getFavouritePurchases: build.query<IPurchaseTenderAPI[], void>({
            query: () => ({
                url: `/GetFavorites/TendersPurchaseRequests`,
                method: 'GET',
                headers: getHeaderAuthorizationIfExists(),
                responseHandler: async (response) => {
                    const data = await response.json() as IPurchaseTender[];
                    return data.map(it => ({...it, isFavorite: true}))
                }
            }),
        }),
        getFavouriteSales: build.query<ISaleTenderAPI[], void>({
            query: () => ({
                url: `/GetFavorites/TendersSaleRequests`,
                method: 'GET',
                headers: getHeaderAuthorizationIfExists(),
                responseHandler: async (response) => {
                    const data = await response.json() as ISaleTender[];
                    return data.map(it => ({...it, isFavorite: true}))
                }
            }),
        }),

        // ======={ BOOLEAN }=======
        isInFavourite: build.query<boolean, IFavouriteRequest>({
            query: ({objectId, objectType}) => ({
                url: `/IsInFavorites/${objectType}/${objectId}`,
                method: 'GET',
                headers: getHeaderAuthorizationIfExists(),
                responseHandler: async (response) => {
                    const data = await response.json() as boolean[];
                    return data[0]
                }
            }),
        }),

        areInFavorites: build.query<boolean, IFavouriteListRequest>({
            query: (body) => ({
                url: `/areInFavorites/`,
                method: 'POST',
                body,
                headers: getHeaderAuthorization(),
            }),
        }),
    })
})