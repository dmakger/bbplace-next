import { FileFormat } from "../data/file.data";


export interface IFileFormat {
    data: string[],
    format: FileFormat,
}


export interface IFileFormatWType {
    value: string
    type: string
}


export interface IFile {
    name?: string
    url?: string,
    format?: FileFormat,
}


/**
 * Props for file
 * @param {string} fileId - ID file
 * @param {boolean} toFile - Should there be conversion to the [IFile] type
 */
export interface IFileProps {
    fileId: string
    toFile?: boolean
}

