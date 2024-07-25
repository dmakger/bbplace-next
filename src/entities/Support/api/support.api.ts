import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { ISupportRequest } from "../model/support.model";


export const SupportAPI = createApi({
    reducerPath: 'supportAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'support/Support'
    }),
    endpoints: (build) => ({
        sendSupportMessage: build.mutation<any, ISupportRequest>({
            query: (body) => ({
                url: '/CreateSupportTicket',
                method: 'POST',
                body,
        }),
	})
})
})
