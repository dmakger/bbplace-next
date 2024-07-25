import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { ISupportRequestMessage } from "../model/support.model";


export const SupportAPI = createApi({
    reducerPath: 'supportAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'support/Support'
    }),
    endpoints: (build) => ({
        sendSupportLead: build.mutation<any, ISupportRequestMessage>({
            query: (body) => ({
                url: '/CreateSupportTicket',
                method: 'POST',
                body,
        }),
	})
})
})
