import { IIcon } from "../model/icon.model";

import FileUpload from '@/shared/assets/img/File/FileUpload.svg'
import FileUploadHovered from '@/shared/assets/img/File/FileUploadPressed.svg'
import FileUploadPressed from '@/shared/assets/img/File/FileUploadPressed.svg'
import FileUploadGray from '@/shared/assets/img/File/FileUploadGray.svg'

import FileDownloadHovered from '@/shared/assets/img/File/FileDownloadHovered.svg'
import FileDownloadPressed from '@/shared/assets/img/File/FileDownloadPressed.svg'

import FileUnknown from '@/shared/assets/img/File/FileUnknown.svg'
import FileDoc from '@/shared/assets/img/File/FileDoc.svg'
import FileXls from '@/shared/assets/img/File/FileXls.svg'
import FilePpt from '@/shared/assets/img/File/FilePpt.svg'
import FilePdf from '@/shared/assets/img/File/FilePdf.svg'

import FileAddDisabled from '@/shared/assets/img/File/FileAddDisabled.svg'
import FileAdd from '@/shared/assets/img/File/FileAdd.svg'
import FileAddHovered from '@/shared/assets/img/File/FileAddHovered.svg'
import FileAddPressed from '@/shared/assets/img/File/FileAddPressed.svg'


export const FILE_UPLOAD_ICON: IIcon = {
    default: FileUpload,
    defaultHovered: FileUploadHovered,
    defaultPressed: FileUploadPressed,
}


export const FILE_UNKNOWN_ICON: IIcon = {
    default: FileUnknown,
    defaultHovered: FileDownloadHovered,
    defaultPressed: FileDownloadPressed,
}


export const FILE_DOC_ICON: IIcon = {
    default: FileDoc,
    defaultHovered: FileDownloadHovered,
    defaultPressed: FileDownloadPressed,
}


export const FILE_XLS_ICON: IIcon = {
    default: FileXls,
    defaultHovered: FileDownloadHovered,
    defaultPressed: FileDownloadPressed,
}


export const FILE_PPT_ICON: IIcon = {
    default: FilePpt,
    defaultHovered: FileDownloadHovered,
    defaultPressed: FileDownloadPressed,
}


export const FILE_PDF_ICON: IIcon = {
    default: FilePdf,
    defaultHovered: FileDownloadHovered,
    defaultPressed: FileDownloadPressed,
}


export const FILE_ADD_ICON: IIcon = {
    default: FileAdd,
    defaultHovered: FileAddHovered,
    defaultPressed: FileAddPressed,

    disabled: FileAddDisabled,
    loading: FileUploadGray,
}

export const FILE_ADD_ICON_DISABLED: IIcon = {
    default: FileAddDisabled,
}