import { ETenderType, ICommonTender } from "../model/tender.model";

export const getTenderType = (tender: ICommonTender) => tender.maximumBudget === undefined ? ETenderType.SALE : ETenderType.PURCHASE;

export const getFormattedDate = (createdAt: string) => new Date(createdAt).toLocaleDateString();