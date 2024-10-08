import { ETTVariants } from "@/widgets/Pages/Tariffs/model/tariffs.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IPayment {
    tariffsType: ETTVariants
}

const initialState: IPayment = {
    tariffsType: '' as ETTVariants,
}

export const PaymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setTariffsType(state, action: PayloadAction<ETTVariants>) {            
            state.tariffsType = action.payload;
        },

    }
})

export const PaymentReducer = PaymentSlice.reducer
