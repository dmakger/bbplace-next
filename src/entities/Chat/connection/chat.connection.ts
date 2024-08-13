import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/storage';
import { IChat } from '@/entities/Chat/model/chat.model';
import connection from '@/api/signalr/signalrClient';

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
			console.log('Updating state with chats:', action.payload);
			state.chats = action.payload;
		},
    },
});
  
export const { messageReceived, chatsReceived } = ChatSlice.actions;
  
export const startChatSignalRConnection = (): AppThunk => async (dispatch) => {
    try {
		await connection.start()
			.then(() => console.log('SignalR Connected.'))
			.catch((err) => console.error('SignalR Connection Error: ', err));
  
      	connection.on('ReceiveMessage', (message) => {
        	dispatch(messageReceived(message));
      	});
  
      	// connection.on('GetChatsAndLastMessages', (chats: IChat[]) => {
        // 	dispatch(chatsReceived(chats));
      	// });
		connection.on('GetChatsAndLastMessages', (chats) => {
			console.log('Received chats:', chats);
			dispatch(chatsReceived(chats));
		});
  
    } catch (err) {
      	console.log('Error while establishing connection: ', err);
      	setTimeout(() => dispatch(startChatSignalRConnection()), 5000);
    }
};

export const ChatReducer = ChatSlice.reducer;