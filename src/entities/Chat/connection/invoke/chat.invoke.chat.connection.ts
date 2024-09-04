import { AppThunk } from "@/storage";
import connection from "@/api/connection/lib/connection.lib";
import { IChat } from "../../model/chat.model";
import { IUser } from "@/entities/Auth/model/auth.model";

/**
 * Получении чата по `userId`
 */
export const findChatByUserId = (userId: IUser['id']): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("FindChat", userId);
    } catch (error) {
        console.error("Ошибка при получении чата по id пользователя:", error);
    }
};


/**
 * Получении чата по `chatId`
 */
export const findChatByChatId = (chatId: IChat['id']): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("FindChatById", chatId);
    } catch (error) {
        console.error("Ошибка при получении чата по id чата:", error);
    }
};


/**
 * Создание чата по `userId`
 */
export const addChatByUserId = (userId: IUser['id']): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("AddChat", {
            userB: userId
        });
    } catch (error) {
        console.error("Ошибка при создании чата по id пользователя:", error);
    }
};

