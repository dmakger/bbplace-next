import { isAuth } from "@/entities/Auth/lib/auth-token.lib"

/**
 * Функция необходма для добавления всех избранных полей в `list`.  
 * Добавляет поле `field='isFavorite'` в передаваемый список `list`, значение для данного поля берется по `id` из списка `favorites`
 */
export const integrateFavoriteInList = <T extends object>(list: T[], favorites?: Record<string, boolean>, field: string = 'isFavorite') => {
    if (!isAuth() || favorites === undefined)
        return list
    return list.map(it => ({
        ...it, 
        [field]: 'id' in it ? favorites[`${it.id}`] : false
    }))
}