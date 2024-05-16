import { ETenderType, ITender, ITenderAPI } from "../model/tender.model";

export const getTenderType = (tender: ITender | ITenderAPI) => tender.type === 'Purchase' ?  ETenderType.PURCHASE : ETenderType.SALE;
