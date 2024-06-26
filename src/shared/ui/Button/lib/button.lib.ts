import { ButtonImageSize } from "../data/button.data";
import { ButtonSize } from "../model/button.model";

export const getImageSizeBySize = (size: ButtonSize) => {
    if (size === ButtonSize.Big)
        return ButtonImageSize.Big
    if (size === ButtonSize.Medium)
        return ButtonImageSize.Medium
    if (size === ButtonSize.Small)
        return ButtonImageSize.Small
    return ButtonImageSize.DefaultSize
}