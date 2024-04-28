
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ILoginResponseDecoded, IUser } from "../model/auth.model";

type UserState = IUser;

const initialState: UserState = {
    fullName: "",
    isAuth: false,
    legalName: "",
    brandName: "",
    role: "",
    phoneNumber: "",
    country: "",
    unreadMessages: 0,
    email: "",
    id: ""
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<ILoginResponseDecoded>) {

            const data = action.payload

            state.isAuth = true;
            state.id = data.userId;
            state.email = data.userName;
            state.fullName = data.fullName;
            state.legalName = data.legalName;
            state.brandName = data.brandName;
            state.role = data.role;
            state.phoneNumber = data.mobilePhone;
            state.country = data.country;
        },
    }
})

export const UserReducer = UserSlice.reducer;