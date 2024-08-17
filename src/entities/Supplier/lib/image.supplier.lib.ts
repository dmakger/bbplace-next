import { getImage } from "@/shared/lib/image.lib"
import { USER_SECONDARY__ICON } from "@/shared/ui/Icon/data/user.data.icon"

/**
 * Возвращает изображение пользователя или дефолтное
 */
export const getSupplierImage = (image?: string) => {
    return image ? getImage(image) : USER_SECONDARY__ICON.default
}