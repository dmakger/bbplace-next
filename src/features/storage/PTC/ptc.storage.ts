import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IPTC {
    amount: number
}

const initialState: IPTC = {
    amount: 0 
}

export const PTCSlice = createSlice({
    name: 'ptc',
    initialState,
    reducers: {
        setAmountPTC(state, action: PayloadAction<number>) {            
            state.amount = action.payload
        },
    }
})

export const PTCReducer = PTCSlice.reducer
