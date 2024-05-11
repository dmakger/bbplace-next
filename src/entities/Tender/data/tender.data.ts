import { IArgsRequest } from "@/api/model/request.model.api"
import { SWITCH_SELECTOR_DESCRIPTION_OPTION } from "@/features/SwitchSelector"
import { IOption } from "@/shared/model/option.model"

export const TENDER_START_PAGE: IArgsRequest['page'] = 0
export const TENDER_LIMIT: IArgsRequest['limit'] = 16

export const TENDER_ARGS_REQUEST: IArgsRequest = {
    page: TENDER_START_PAGE,
    limit: TENDER_LIMIT
}

export const SWITCH_SELECTOR_TENDER_OPTIONS: IOption[] = [
    SWITCH_SELECTOR_DESCRIPTION_OPTION
]