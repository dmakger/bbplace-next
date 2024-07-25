export interface ISupportRequestMessage {
    Name: string
    CompanyName: string
    Contact: string
    Theme: string
    Message: string
    Files: []
}

export type ISupportRequest = FormData