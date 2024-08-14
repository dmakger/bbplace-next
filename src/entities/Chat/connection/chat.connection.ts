import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, IChatData, IMessage } from '@/entities/Chat/model/chat.model';

interface ChatState {
	messages: IMessage[];
    chats: IChat[];
    chatDataList: IChatData[];
}
  
const initialState: ChatState = {
	messages: [],
	chats: [],
	chatDataList: [],
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
    },
});
  
export const { messageAddReceived, messagesReceived, chatsReceived } = ChatSlice.actions;

export const ChatReducer = ChatSlice.reducer;