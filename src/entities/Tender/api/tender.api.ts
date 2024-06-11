import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { IArgsRequest } from "@/api/model/request.model.api";
import { getURL } from "@/api/request";
import { ETenderType, IPurchaseTender, ISaleTender, ITenderAPI, ITenderByTwoObjectsAPI } from "../model/tender.model";
import { getArgsTender } from "../lib/args.tender.lib";


export const TenderAPI = createApi({
    reducerPath: 'tenderAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'tender/api/Tenders'
    }),
    endpoints: (build) => ({
        //ALL TENDERS
        getAllTenders: build.query<ITenderAPI[], IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetAllRequests/SingleList/Filter/`, getArgsTender(args)),
				method: 'GET',
            })
        }),
        getAllTendersByTwoObjects: build.query<ITenderByTwoObjectsAPI, IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetAllRequests/Filter/`, getArgsTender(args)),
				method: 'GET',
            })
        }),
        getCountAllTenders: build.query<number, IArgsRequest | undefined>({
            query: (args) => ({
                url: `/GetAllRequests/Filter/${args?.limit}/CountPages/`,
                method: 'GET',
                params: args?.params
            })
        }),

        // TENDER BY TYPE
        getTender: build.query<ITenderAPI, {tenderId: number, type: ETenderType}>({
            query: ({tenderId, type}) => ({
                url: `/GetTender/?id=${tenderId}&type=${type}`
            })
        }),

        //SALE TENDERS
        getSaleTenderById: build.query<ITenderAPI, number>({
            query: (tenderId) => ({
                url: `/GetSaleRequest/${tenderId}`
            })
        }),
        getSaleTenders: build.query<ITenderAPI[], IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetSaleRequests/OrderByDate/DESC/`, getArgsTender(args)),
				method: 'GET',
            })
        }),
        getCountSaleTenders: build.query<number, IArgsRequest | undefined>({
            query: (args) => ({
                url: `/GetSaleRequests/OrderByDate/DESC/${args?.limit}/CountPages/`,
                method: 'GET',
                params: args?.params
            })
        }),
        //PURCHASE TENDERS
        getPurchaseTenderById: build.query<ITenderAPI, number>({
            query: (tenderId) => ({
                url: `/GetPurchaseRequest/${tenderId}`
            })
        }),
        getPurchaseTenders: build.query<ITenderAPI[], IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetPurchaseRequests/OrderByDate/DESC/`, getArgsTender(args)),
				method: 'GET',
            })
        }),
        getCountPurchaseTenders: build.query<number, IArgsRequest | undefined>({
            query: (args) => ({
                url: `/GetPurchaseRequests/OrderByDate/DESC/${args?.limit}/CountPages/`,
                method: 'GET',
                params: args?.params
            })
        }), 
	})
})