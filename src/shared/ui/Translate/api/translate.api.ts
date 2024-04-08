import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { ITranslateRequest, ITranslateResponse } from "../model/translate.model";
import { options } from "@/api/interceptors";


export const TranslateAPI = createApi({
    reducerPath: 'translateAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: options.baseURL + 'translate/Translation'
    }),
    endpoints: (build) => ({
        translate: build.mutation<ITranslateResponse, ITranslateRequest>({
            query: (body) => ({
                url: '/TranslateText',
                method: 'POST',
                body,
            })
        })
    })
})

