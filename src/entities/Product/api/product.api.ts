import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { options } from "@/api/interceptors";
import { IGetProductsByUser, IGroupData, IProductAPI } from "../model/product.model";
import { IArgsRequest } from "@/api/model/request.model.api";
import { getArgsProduct } from "../lib/args.product.lib";
import { getURL } from "@/api/request";
import { PRODUCT_BY_USER_LIMIT, PRODUCT_START_PAGE } from "../data/product.data";
import { getHeaderAuthorization } from "@/entities/Auth/lib/auth-token.lib";
import { IPropsCreateProduct, IPropsUpdateProduct } from "../model/props.product.model";


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
        getProductById: build.mutation<IProductAPI, number | string>({
            query: (itemId) => ({
                url: `/GetItem/${itemId}`,
            }),
        }),
        deleteProduct: build.mutation<IProductAPI, number | string>({
            query: (itemId) => ({
                url: `/DeleteItem/${itemId}`,
                method: 'POST',
                headers: getHeaderAuthorization(),
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
        getDraft: build.query<IProductAPI, number | string>({
            query: (draftId) => ({
                url: `/GetItemDraft/${draftId}`,
                method: 'GET',
                headers: getHeaderAuthorization(),
            })
        }),

        deleteDraft: build.mutation<void, number | string>({
            query: (draftId) => ({
                url: `/DeleteItemDraft/${draftId}`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: {}
            }),
        }),
        //GET PRODUCTS BY USER
        getDraftsByUser: build.query<IProductAPI[], IArgsRequest>({
            query: ({ page = PRODUCT_START_PAGE, limit = PRODUCT_BY_USER_LIMIT }) => ({
                url: `/GetItemsDrafts/ByUser/${limit}/${page}`,
                method: 'GET',
                headers: getHeaderAuthorization(),
            }),
        }),
        getPagesDraftsByUser: build.query<number, IGetProductsByUser>({
            query: ({ limit = PRODUCT_BY_USER_LIMIT, userId }) => ({
                url: `/GetItemsDrafts/ByUser/${userId}/${limit}/CountPages`,
                method: 'GET',
            })
        }),
        getDraftsByGroup: build.query<IProductAPI[], string | number>({
            query: (groupId) => ({
                url: `/GetItemsDrafts/${groupId}`,
                method: 'GET',
                headers: getHeaderAuthorization(),
            }),
        }),


        // ==========={ EXCEL }===========
        getImportExcelTemplate: build.mutation<Blob, number[]>({
            query: (selectedCategoriesId: number[]) => ({
                url: `/GetImportExcelTemplate`,
                method: 'POST',
                headers: {
                    ...getHeaderAuthorization(),
                    'Content-Type': 'application/json', 
                  },               
                body: JSON.stringify(selectedCategoriesId),
                responseHandler: (response) => response.blob(),
            })
        }),
        importProductsFromExcel: build.mutation<void, FormData>({
            query: (formData) => ({
                url: `/ImportItemsFromExcel`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: formData
            })
        }),
        updatePricesFromExcel: build.mutation<void, FormData>({
            query: (formData) => ({
                url: `/UpdatePrices`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: formData
            })
        }),
        getPricesExcel: build.query<Blob, void>({
            query: () => ({
                url: `/GetExcel`,
                method: 'GET',
                headers: getHeaderAuthorization(),
                responseHandler: (response) => response.blob(),
        })
        }),
        

        // ==========={ PRODUCT => CREATE | UPDATE | DELETE }===========
        // create
        createProduct: build.mutation<number, IPropsCreateProduct>({
            query: (body) => ({
                url: `/AddItem`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body
            }),
        }),

        // update
        updateProduct: build.mutation<number, IPropsUpdateProduct>({
            query: (body) => ({
                url: `/EditItem`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body
            }),
        }),

        // delete
        deleteProducts: build.mutation<void, number[]>({
            query: (checkedItems) => ({
                url: `/DeleteItems`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: checkedItems
            }),
        }),
        deleteProductsDrafts: build.mutation<void, number[]>({
            query: (checkedItems) => ({
                url: `/DeleteItemsDrafts`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: checkedItems
            }),
        }),


        // ==========={ GROUP => CREATE | GET }===========
        // create
        createGroup: build.mutation<number, void>({
            query: () => ({
                url: `/CreateGroup`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: {}
            })
        }),
        createDraftGroup: build.mutation<number, void>({
            query: () => ({
                url: `/CreateDraftGroup`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: {}
            })
        }),

        // getter
        getGroupProducts: build.query<IProductAPI[], string | number>({
            query: (groupId) => ({
                url: `/GetItems/${groupId}`,
            })
        }),
        getGroupDrafts: build.query<IProductAPI[], string | number>({
            query: (groupId) => ({
                url: `/GetItemsDrafts/${groupId}`,
            })
        }),

        // add in group
        addProductToGroup: build.mutation<number, IGroupData>({
            query: ({groupId, productId}) => ({
                url: `/AddItemToGroup/${productId}/${groupId}`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: {}
            })
        }),
        addItemToDraftGroup: build.mutation<number, IGroupData>({
            query: ({groupId, productId}) => ({
                url: `/AddItemToDraftGroup/${productId}/${groupId}`,
                method: 'POST',
                headers: getHeaderAuthorization(),
                body: {}
            })
        }),
    })

})
