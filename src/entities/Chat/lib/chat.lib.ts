import { IUser } from "@/entities/Auth/model/auth.model";
import { IChat } from "../model/chat.model";

/**
 * Вернет пользователя по `myId`
 */
export const getOtherUserIdByChat = (chat: IChat, myId: IUser['id']): IUser['id'] => {
    return chat.userA === myId ? chat.userB : chat.userA
}