/**
 * @param length - длина списка 
 * @param index - индекс до удаления
 * @returns `undefined`, если `length < 2` или `новый index`
 */
export const getIndexBeforeDelete = (length: number, index?: number) => {
    if (length < 2 || index === undefined)
        return undefined
    if (index > 0)
        return index-1
    return index
}



/**
 * @param length - длина списка
 * @param index - текущий индекс
 * @returns `undefined`, если `index === undefined || length === 0` или `предыдущий index`
 */
export const getPrevIndex = (length: number, index?: number) => {
    if (index === undefined || length === 0) return
    return Math.max(index - 1, 0)
}


/**
 * @param length - длина списка
 * @param index - текущий индекс
 * @returns `undefined`, если `index === undefined` или `следующий index`
 */
export const getNextIndex = (length: number, index?: number) => {
    if (index === undefined) return
    if (length-1 === index) return index
    return index + 1
}

/**
 * Удаляет из списков все `undefined` и `null`
 * @param list - передаваемый список
 * @returns 
 */
export const getListWithout = <T>(list: (T | undefined | null)[]): T[] => {
    return list.filter(it => it !== undefined && it !== null) as T[]
}