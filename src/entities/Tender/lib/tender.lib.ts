import { ETenderType, ITender, ITenderAPI } from "../model/tender.model";

export const getTenderType = (tender: ITender | ITenderAPI) => tender.hasOwnProperty('minOrderUnits') ?  ETenderType.SALE : ETenderType.PURCHASE;
