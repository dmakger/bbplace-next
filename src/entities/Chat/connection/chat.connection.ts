import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatData, IMessage } from '@/entities/Chat/model/chat.model';

interface ChatState {
	messages: IMessage[];
    chatDataList: IChatData[];
    currentChat?: IChat | null;
}
  
const initialState: ChatState = {
	messages: [],
	chatDataList: [],
	currentChat: undefined,
};
  
export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
		messageAddReceived: (state, action: PayloadAction<IMessage>) => {
			const newMessage = action.payload
        	state.messages.push(newMessage);  
			// Переносим чат на вверх в chatDataList
			const chatIndex = state.chatDataList.findIndex(
                (chatData) => chatData.chat.id === newMessage.chatId
            );
            if (chatIndex !== -1) {
                const updatedChatData = {
                    ...state.chatDataList[chatIndex],
                    message: newMessage,
                };
                state.chatDataList.splice(chatIndex, 1);
                state.chatDataList.unshift(updatedChatData);
            } else if (state.currentChat && state.currentChat.id === newMessage.chatId) {
                // Если текущий чат соответствует новому сообщению, добавляем его в начало списка
                const newChatData: IChatData = {
                    chat: state.currentChat,
                    message: newMessage,
                };
                state.chatDataList.unshift(newChatData);
            }
      	},
        messagesReceived: (state, action: PayloadAction<IMessage[]>) => {
        	state.messages = action.payload
      	},

      	chatsReceived: (state, action: PayloadAction<IChatData[]>) => {
            state.chatDataList = action.payload;
        },
		currentChatReceived: (state, action: PayloadAction<IChat>) => {
        	state.currentChat = action.payload
      	},
    },
});
  
export const { messageAddReceived, messagesReceived, chatsReceived, currentChatReceived } = ChatSlice.actions;

export const ChatReducer = ChatSlice.reducer;