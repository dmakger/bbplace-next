import { useState } from "react"
import {skipToken} from "@reduxjs/toolkit/query";

import { IFavouriteRequest } from "../model/favourite.model";
import { FavouriteAction } from "../data/favourite.data"
import { FavouriteAPI } from "../api/favourite.api"
import { IPurchaseTender, IPurchaseTenderAPI, ISaleTender, ISaleTenderAPI } from "@/entities/Tender/model/tender.model";
import { IProductAPI } from "@/entities/Product/model/product.model";

interface FavouriteLibProps {
    body?: IFavouriteRequest,
    onlyFavourite?: boolean
}

export const useFavourite = ({body, onlyFavourite=false}: FavouriteLibProps) => {
    // STATE
    const [action, setAction] = useState<FavouriteAction>(FavouriteAction.Add)

    //API
    const [addFavouriteRequest, {
        isSuccess: addIsSuccess, 
        isError: addIsError
    }] = FavouriteAPI.useAddFavouriteMutation()

    const [deleteFavouriteRequest, {
        isSuccess: deleteIsSuccess,
        isError: deleteIsError
    }] = FavouriteAPI.useDeleteFavouriteMutation()

    const {data: isInFavourite} = FavouriteAPI.useIsInFavouriteQuery(body ? body : skipToken)
    const {data: favouritePurchases} = FavouriteAPI.useGetFavouritePurchasesQuery(onlyFavourite ? '' : skipToken)
    const {data: favouriteSales} = FavouriteAPI.useGetFavouriteSalesQuery(onlyFavourite ? '' : skipToken)
    const {data: favouriteProducts} = FavouriteAPI.useGetFavouriteProductsQuery(onlyFavourite ? '' : skipToken)
    
    // RETURN
    return {
        addFavourite: () => {
            if (!body)
                return
            addFavouriteRequest(body)
            setAction(FavouriteAction.Add)
        },
        deleteFavourite: () => {
            if (!body)
                return
            deleteFavouriteRequest(body)
            setAction(FavouriteAction.Delete)
        },
        data:{
            addIsSuccess,
            addIsError,
            deleteIsSuccess,
            deleteIsError,
            isInFavourite,
            get favouritePurchaseTenders(): IPurchaseTender[] | undefined {
                return onlyFavourite ? favouritePurchases : undefined
            },
            get favouriteSaleTenders(): ISaleTender[] | undefined{
                return onlyFavourite ? favouriteSales : undefined
            },
            get favouriteProducts(): IProductAPI[] | undefined {
                return onlyFavourite ? favouriteProducts : undefined
            },
        }
    }
}

/**
 * Убирает пустые элементы из переданного массива
 * @returns количество актуальных элементов
 */

export const getFavouriteArrayLength = (array: IProductAPI[] | IPurchaseTenderAPI[] | ISaleTenderAPI[]) => {
    if(!array) return;
    return array.filter(it => it.id !== 0).length;
}
