import { IOptionTab, IDetailedProductOptionsTab } from "../model/detailedPageInfo.model";

export const convertObjectToArray = (obj: IDetailedProductOptionsTab): Array<{ key: string, value: IOptionTab }> => {
    return Object.keys(obj).map(key => ({
        key,
        value: obj[key] as IOptionTab
    }));
};