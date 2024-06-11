import { IIcon } from "../model/model";

import FileHovered from '@/shared/assets/img/File/FileHovered.svg'
import FilePressed from '@/shared/assets/img/File/FilePressed.svg'

import FileUpload from '@/shared/assets/img/File/FileUpload.svg'
import FileUploadHovered from '@/shared/assets/img/File/FileUploadPressed.svg'
import FileUploadPressed from '@/shared/assets/img/File/FileUploadPressed.svg'

import FileUnknown from '@/shared/assets/img/File/FileUnknown.svg'
import FileDoc from '@/shared/assets/img/File/FileDoc.svg'
import FileXls from '@/shared/assets/img/File/FileXls.svg'
import FilePpt from '@/shared/assets/img/File/FilePpt.svg'
import FilePdf from '@/shared/assets/img/File/FilePdf.svg'



export const FILE_UPLOAD_ICON: IIcon = {
    default: FileUpload,
    defaultHovered: FileUploadHovered,
    defaultPressed: FileUploadPressed,
}


export const FILE_UNKNOWN_ICON: IIcon = {
    default: FileUnknown,
    defaultHovered: FileHovered,
    defaultPressed: FilePressed,
}


export const FILE_DOC_ICON: IIcon = {
    default: FileDoc,
    defaultHovered: FileHovered,
    defaultPressed: FilePressed,
}


export const FILE_XLS_ICON: IIcon = {
    default: FileXls,
    defaultHovered: FileUploadPressed,
    defaultPressed: FileUploadPressed,
}


export const FILE_PPT_ICON: IIcon = {
    default: FilePpt,
    defaultHovered: FileUploadPressed,
    defaultPressed: FileUploadPressed,
}


export const FILE_PDF_ICON: IIcon = {
    default: FilePdf,
    defaultHovered: FileUploadPressed,
    defaultPressed: FileUploadPressed,
}
