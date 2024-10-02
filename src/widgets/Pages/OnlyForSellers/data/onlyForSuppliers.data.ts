import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export const ONLY_FOR_SUPPLIERS_PAGES_ARRAY: string[] = [
    DASHBOARD_PAGES.PRODUCTS(false).path,
    DASHBOARD_PAGES.PRICES_N_DISCOUNTS.path
]