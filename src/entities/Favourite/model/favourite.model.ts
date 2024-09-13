import { FavouriteType } from "../data/favourite.data"

export interface IFavouriteRequest {
    objectId: number
    objectType: FavouriteType
}


export interface IFavouriteListRequest {
    objectIds: number[]
    objectType: FavouriteType
}

