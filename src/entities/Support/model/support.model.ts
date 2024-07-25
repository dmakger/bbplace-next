import { IFile } from "@/entities/File/model/file.model"

export interface ISupportRequestMessage {
    Name: string
    CompanyName: string
    Contact: string
    Theme: string
    Message: string
    Files: []
}