import { ETenderType } from "../model/tender.model";

export const getTenderType = (maximumBudget: number) => maximumBudget === undefined ? ETenderType.SALE : ETenderType.PURCHASE;
