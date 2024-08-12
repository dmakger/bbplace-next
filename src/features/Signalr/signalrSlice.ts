import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import connection from './signalrClient';
import { AppThunk } from '@/storage';

interface SignalRState {
    messages: string[];
  }
  
  const initialState: SignalRState = {
    messages: [],
  };
  
  export const SignalrSlice = createSlice({
    name: 'signalr',
    initialState,
    reducers: {
      messageReceived: (state, action: PayloadAction<string>) => {
        state.messages.push(action.payload);
      },
    },
  });
  
  export const { messageReceived } = SignalrSlice.actions;
  
  export const startSignalRConnection = (): AppThunk => async (dispatch) => {
    try {
      await connection.start();
      console.log('SignalR Connected.');
  
      connection.on('ReceiveMessage', (message) => {
        dispatch(messageReceived(message));
      });
    } catch (err) {
      console.log('Error while establishing connection: ', err);
      setTimeout(() => dispatch(startSignalRConnection()), 5000);
    }
  };
  

export const SignalrReducer = SignalrSlice.reducer;