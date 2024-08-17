
export interface IChat {
    id: number
    userA: string
    userB: string
}

export interface IMessage {
    id: number
    chatId: number
    isRead: boolean
    sender: string
    text: string
    attachments: string | null
    createdAt: string | Date
}

export interface IChatData {
    chat: IChat
    message: IMessage
}
