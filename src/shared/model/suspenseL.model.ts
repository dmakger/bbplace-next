import { Dispatch, SetStateAction } from "react";

/**
 * Используется в `SuspenseL.Any`  
 * Можно передавать список `ISuspenseLItem`, тем самым будете получать все необходимые вам пропсы
 */
export interface ISuspenseLItem {
    searchKey: string,
    set: Dispatch<SetStateAction<string | null>> | Dispatch<SetStateAction<string | undefined>>
    defaultValue?: any
}