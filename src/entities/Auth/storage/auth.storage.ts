
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ILoginResponseDecoded, IUser } from "../model/auth.model";
import { isAuth, removeFromStorage } from "../lib/auth-token.lib";

type UserState = IUser;

const initialState: UserState = {
    fullName: "",
    isAuth: isAuth(),
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
            state.id = data.UserId;
            state.email = data.UserName;
            state.fullName = data.FullName;
            state.legalName = data.LegalName;
            state.brandName = data.BrandName;
            state.role = data.Role;
            state.phoneNumber = data.MobilePhone;
            state.country = data.country;
        },
        setNotAuth(state){
            state.isAuth = false;
            removeFromStorage()
        }
    },
})

export const UserReducer = UserSlice.reducer;