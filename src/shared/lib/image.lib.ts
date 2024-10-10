import { IMAGE_API__DEFAULTS, ImageAPIVariants } from "../data/image.data"
import { IIcon, IIconBoolean, IWarningIcon } from "../ui/Icon/model/icon.model"

const START_IMAGE_URL = "https://bbplace.ru/fileservice/api/FilesS3/GetFile"
const START_IMAGE_ASYNC_URL = "https://bbplace.ru/fileservice/api/FilesS3/GetFileURL"
const START_IMAGE_GET_FILE_URL = "https://hb.bizmrg.com/image_store"

export const getImage = (image: string) => {
    try {
        if (image.startsWith('https://'))
            return image
        return `${START_IMAGE_GET_FILE_URL}/${image}`
    } catch (err) {
        return image
    }
}

export const getImageFetch = async (image: string) => {
    try {
        const url = `${START_IMAGE_ASYNC_URL}/${image}`
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch image');
            return image
        }
        const data = await response.json();
        console.log('qwe async', response, data)
        return data.url;
        // return `${START_IMAGE_URL}/${image}`
    } catch (err) {
        return image
    }
}


export const getDefaultImageAPI = (variants?: ImageAPIVariants) => {
    return variants ? IMAGE_API__DEFAULTS[variants] : IMAGE_API__DEFAULTS[ImageAPIVariants.Default]
}


/**
 * Удаляет из {IIcon} все те поля у которых в {has} стоит False
 * @param icon 
 * @param has 
 * @returns 
 */
export const getIcon = (
    icon: IIcon | IWarningIcon, 
    has: IIconBoolean,
) => {
    return {
        default: icon.default,
        defaultHovered: has.defaultHovered ? icon.defaultHovered : undefined,
        defaultPressed: has.defaultPressed ? icon.defaultPressed : undefined,

        active: has.active ? icon.active : undefined,
        activeHovered: has.activeHovered ? icon.activeHovered : undefined,
        activePressed: has.activePressed ? icon.activePressed : undefined,
        
        disabled: has.disabled ? icon.disabled : undefined,
        loading: has.loading ? icon.loading : undefined,
    } as IIcon
}