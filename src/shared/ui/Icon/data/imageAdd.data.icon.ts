import { IIcon } from "../model/icon.model";

import ImageAddDisabled from '@/shared/assets/img/ImageAdd/ImageAddDisabled.svg'
import ImageAddDefaulted from '@/shared/assets/img/ImageAdd/ImageAddDefaulted.svg'
import ImageAddHovered from '@/shared/assets/img/ImageAdd/ImageAddHovered.svg'
import ImageAddPressed from '@/shared/assets/img/ImageAdd/ImageAddPressed.svg'
import ImageAddUpload from '@/shared/assets/img/ImageAdd/ImageAddUpload.svg'


export const IMAGE_ADD_ICON: IIcon = {
    default: ImageAddDefaulted,
    defaultHovered: ImageAddHovered,
    defaultPressed: ImageAddPressed,

    disabled: ImageAddDisabled,
    loading: ImageAddUpload,
}
