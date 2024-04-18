import { DEFAULT_APPLICATION_OPTION, DEFAULT_CATEGORY_OPTION, DEFAULT_COUNTRY_OPTION, DEFAULT_STATUS_OPTION } from "@/features/Filter/data/filter.data";
import { DEFAULT_ALPHABETICAL_SORT, DEFAULT_DATE_SORT } from "@/features/Sort";
import { ISortFilter } from "../model/sortFilterSidebar.model";
import { CORE_PARAMS } from "@/config/params/core.params.config";

export const DEFAULT_SORT_FILTER__DATA: ISortFilter = {
    country: DEFAULT_COUNTRY_OPTION,
    minOrder: '',
    status: DEFAULT_STATUS_OPTION,
    category: DEFAULT_CATEGORY_OPTION,
    application: DEFAULT_APPLICATION_OPTION,
    // sortByDate: DEFAULT_DATE_SORT,
    [CORE_PARAMS.SORT_KEYS.DATE_START]: DEFAULT_DATE_SORT,
    sortByAlphabetical: DEFAULT_ALPHABETICAL_SORT,
}