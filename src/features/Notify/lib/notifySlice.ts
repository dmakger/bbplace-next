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
                notification.button &&
                notification.button?.length === button?.length &&
                notification.button.every((btn, index) => (
                    btn.title === button[index].title
            )))
            
            if (!notificationExists) {
                state.notifications.push({
                    id: generateId(),
                    ...action.payload
                });
            }
        },
        deleteNotification(state, action: PayloadAction<number>){
            state.notifications = state.notifications.filter((value) => value.id !== action.payload)
        },
    }
})

export const NotifyReducer = NotifySlice.reducer