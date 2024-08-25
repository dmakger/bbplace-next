
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ILoginResponseDecoded, IUser, IUserOptionalProps } from "../model/auth.model";
import { isAuth, removeFromStorage } from "../lib/auth-token.lib";


const initialState: IUser = {
    id: "",
    fullName: "",
    isAuth: isAuth(),
    legalName: "",
    brandName: "",
    role: "",
    phoneNumber: "",
    country: "",
    unreadMessages: 0,
    email: "",
    prevPath: '',
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<Partial<ILoginResponseDecoded>>) {  // Используем Partial для обновления только некоторых полей
            const data = action.payload;

            if (data.UserId) state.id = data.UserId;
            if (data.UserName) state.email = data.UserName;
            if (data.FullName) state.fullName = data.FullName;
            if (data.LegalName) state.legalName = data.LegalName;
            if (data.BrandName) state.brandName = data.BrandName;
            if (data.Role) state.role = data.Role;
            if (data.MobilePhone) state.phoneNumber = data.MobilePhone;
            if (data.Country) state.country = data.Country;

            state.isAuth = true;
        },

        setAuthOptional(state, action: PayloadAction<IUserOptionalProps>) {
            const data = action.payload
            state.photoId = data.photoId
            state.prevPath = data.prevPath
        },

        setNotAuth(state){
            state.isAuth = false;
            state.email = '';
            removeFromStorage()
        }
    },
})

export const UserReducer = UserSlice.reducer;