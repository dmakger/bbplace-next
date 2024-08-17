import { IIcon } from '../../../model/icon.model'

import FileAddTertiary from '@/shared/assets/img/File/Add/FileAddTertiary.svg'
import FileAddTertiaryHovered from '@/shared/assets/img/File/Add/FileAddTertiaryHovered.svg'
import FileAddTertiaryPressed from '@/shared/assets/img/File/Add/FileAddTertiaryPressed.svg'
import FileAddOnTertiary from '@/shared/assets/img/File/Add/FileAddOnTertiary.svg'
import FileAddTertiaryBorder from '@/shared/assets/img/File/Add/FileAddTertiaryBorder.svg'
import FileAddDisabled from '@/shared/assets/img/File/Add/FileAddDisabled.svg'
import FileUploadTertiaryPressed from '@/shared/assets/img/File/Upload/FileUploadTertiaryPressed.svg'

/**
 * Используется в `Input.File` при выборе `view = FileInputView.Large`
 */
export const FILE_ADD__TERTIARY_BORDER__ICON: IIcon = {
    default: FileAddTertiaryBorder,
    defaultHovered: FileAddTertiaryHovered,
    defaultPressed: FileAddTertiaryPressed,

    disabled: FileAddDisabled,
    loading: FileUploadTertiaryPressed,
}

/**
 * Используется в `Input.File` при выборе `view = FileInputView.Small`
 */
export const FILE_ADD__TERTIARY__ICON: IIcon = {
    default: FileAddTertiary,
    defaultHovered: FileAddOnTertiary,

    disabled: FileAddDisabled,
    loading: FileUploadTertiaryPressed,
}


export const FILE_ADD__DISABLED__ICON: IIcon = {
    default: FileAddDisabled,
}