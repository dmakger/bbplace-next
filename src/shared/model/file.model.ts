import { FileFormat } from "../data/file.data";


export interface IFileFormat {
    data: string[],
    format: FileFormat,
}


export interface IFileFormatObject {
    name?: string
    data: string,
    format: FileFormat,
}


