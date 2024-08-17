import { AppThunk } from "@/storage";
import connection from "@/api/connection/lib/connection.lib";
import { IPropsInvokeAddMessage } from "@/entities/Chat/model/connection.chat.model";
import { IMessage } from "../../model/chat.model";

/**
 * Добавление сообщения в чат
 */
export const addMessageToChat = (message: IPropsInvokeAddMessage): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("AddMessage", message);
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    }
};


/**
 * Прочитывание сообщения по его `id`
 */
export const markMessageAsRead = (messageId: IMessage['id']): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("MarkMessageAsRead", messageId);
    } catch (error) {
        console.error("Ошибка при прочитывании сообщения:", error);
    }
};
