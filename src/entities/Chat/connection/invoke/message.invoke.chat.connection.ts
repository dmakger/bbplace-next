import { AppThunk } from "@/storage";
import connection from "@/api/connection/lib/connection.lib";
import { IPropsInvokeAddMessage } from "@/entities/Chat/model/connection.chat.model";

export const addMessageToChat = (message: IPropsInvokeAddMessage): AppThunk => async (dispatch) => {
    try {
        await connection.invoke("AddMessage", message);
        // Здесь можно добавить дополнительные действия, например, обновление списка сообщений в чате
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        // Можно добавить обработку ошибок
    }
};
