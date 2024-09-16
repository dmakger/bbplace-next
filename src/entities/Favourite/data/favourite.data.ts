import { IProductAPI } from "@/entities/Product/model/product.model";
import { IPurchaseTender, ISaleTender } from "@/entities/Tender/model/tender.model";

export enum FavouriteType {
    Product = "Items", 
    Supplier = "Suppliers", 
    TenderPurchase = "TendersPurchaseRequests", 
    TenderSale = "TendersSaleRequests",
}

export enum FavouriteAction {
    Add = "Add", 
    Delete = "Delete", 
}

export type FavoriteObjectType = IProductAPI | IPurchaseTender | ISaleTender
export type FavoriteObjectTypeList = IProductAPI[] | IPurchaseTender[] | ISaleTender[]