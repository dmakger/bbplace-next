import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { IArgsRequest } from "@/api/api/model/request.model.api"
import { getURL } from "@/api/request";
import { ISupplierAPI } from "../model/supplier.model";
import { getArgsSupplier } from "../lib/args.supplier.lib";


export const SupplierAPI = createApi({
    reducerPath: 'supplierAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'tender/api/Tenders'
    }),
    endpoints: (build) => ({
        getSuppliers: build.query<ISupplierAPI[], IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetSellers/Filter/`, getArgsSupplier(args)),
				method: 'GET',
            })
        }),

        getCountSuppliers: build.query<number, IArgsRequest | undefined>({
            query: (args) => ({
                url: getURL(`/GetSellers/Filter/${args?.limit}/CountPages/`, {params: args?.params}),
				method: 'GET',
            })
        }),
	})
})
