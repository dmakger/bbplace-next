import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatData, IMessage } from '@/entities/Chat/model/chat.model';

interface ChatState {
	messages: IMessage[];
    chatDataList: IChatData[];
    currentChat?: IChat;
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
        	state.messages.push(action.payload);
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