import { IGroupProducts } from "../model/group.product.model";
import { IProduct } from "../model/product.model";

/**
 * Создание списка групп продуктов
 * @param products - продукты
 * @returns Список группы товаров 
 */
export const createGroupProducts = (products: IProduct[]): IGroupProducts[] => {
    const groupItems: IGroupProducts[] = [];

    
    const groupedItems: Record<number, IProduct[]> = products && products.reduce((result, product) => {
        const groupId = product.groupId !== null ? product.groupId : 0
        if (!result[groupId]) {
            result[groupId] = [];
        }
        result[groupId].push(product);
        return result;
    }, {} as Record<number, IProduct[]>);

    let groupIdCounter = 1; 
    for (const groupId in groupedItems) {
        const itemsInGroup = groupedItems[+groupId];

        const main = itemsInGroup.reduce((minItem, currentItem) => {
            return currentItem.id < minItem.id ? currentItem : minItem;
        }, itemsInGroup[0]);

        const rest = itemsInGroup.filter(item => item.id !== main.id);

        const groupDraftItem: IGroupProducts = {
            id: groupIdCounter,
            main,
            rest,
        };

        groupIdCounter++; 

        groupItems.push(groupDraftItem);
    }

    return groupItems;
};