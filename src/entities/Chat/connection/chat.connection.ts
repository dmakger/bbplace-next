import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from '@/entities/Chat/model/chat.model';

interface ChatState {
	messages: string[];
    chats: IChat[];
}
  
const initialState: ChatState = {
	messages: [],
	chats: [],
};
  
export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
		messageReceived: (state, action: PayloadAction<string>) => {
        	state.messages.push(action.payload);
      	},
      	chatsReceived: (state, action: PayloadAction<IChat[]>) => {
            state.chats = action.payload;
        },
    },
});
  
export const { messageReceived, chatsReceived } = ChatSlice.actions;

export const ChatReducer = ChatSlice.reducer;