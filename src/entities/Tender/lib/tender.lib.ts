import { ETenderType, ICommonTender } from "../model/tender.model";

export const getTenderType = (tender: ICommonTender) => tender.hasOwnProperty('maximumBudget') ?  ETenderType.PURCHASE : ETenderType.SALE;
