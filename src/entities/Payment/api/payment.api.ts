import { options } from "@/api/interceptors";
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { IPaymentLink } from "../model/payment.model";
import { getHeaderAuthorization } from "@/entities/Auth/lib/auth-token.lib";


export const PaymentAPI = createApi({
    reducerPath: 'paymentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'payment'
    }),
    endpoints: (build) => ({

        getItemsId: build.query<IPaymentLink, string>({
            query: (itemId: string) => ({
                url: `/api/Payments?itemId=${itemId}`,
                method: 'GET',
                headers: {
                    ...getHeaderAuthorization(),
                }
            })
        })
    })
})