import { CURRENCY, NAME_CURRENCY } from "../data/currency.metrics.data";

export const getCurrency = (x: string | undefined): string | undefined => {
    if (!x)
        return x
    if (CURRENCY.hasOwnProperty(x))
        return CURRENCY[x];
    if (NAME_CURRENCY.hasOwnProperty(x))
        return NAME_CURRENCY[x]
    return x
}