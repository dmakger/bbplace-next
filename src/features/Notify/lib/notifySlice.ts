import { generateId } from "@/shared/lib/generateId.lib";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { INotify, INotifyBody } from "../model/notify.model";
import { isEqual } from "lodash";

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
            const {text, status, button} = action.payload
            const notificationExists = state.notifications.some(notification =>
                notification.text === text &&
                notification.status === status &&
                isEqual(notification.button, button) // Глубокое сравнение объектов button
            );
            
            if (!notificationExists) {
                state.notifications.push({
                    id: generateId(),
                    text, 
                    status,
                    button
                });
            }
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((value) => value.id !== action.payload)
        },
    }
})

export const NotifyReducer = NotifySlice.reducer