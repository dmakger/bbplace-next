import { generateId } from "@/shared/lib/generateId.lib";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { INotify, INotifyBody } from "../model/notify.model";

type IInitialState = {
    notifications: INotify[]
}

const initialState: IInitialState = {
    notifications: []
}

export const NotifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<INotifyBody>){
            const {text, status} = action.payload
            state.notifications.push({
                id: generateId(),
                text, 
                status,
            })
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((value) => value.id !== action.payload)
        },
    }
})

export const NotifyReducer = NotifySlice.reducer