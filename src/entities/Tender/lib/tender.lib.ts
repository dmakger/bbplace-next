import { ETenderType } from "../model/tender.model";

export const getStatusTender = (maximumBudget: number) => maximumBudget === undefined ? ETenderType.SALE : ETenderType.PURCHASE;
