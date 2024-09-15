import { FavouriteAPI } from "../api/favourite.api"
import { FavouriteType } from "../data/favourite.data"

export interface IFavouriteRequest {
    objectId: number
    objectType: FavouriteType
}


export interface IFavouriteListRequest {
    objectIds: number[]
    objectType: FavouriteType
}

// export type TAreInFavorites = ReturnType<typeof FavouriteAPI.useAreInFavoritesMutation>[0]