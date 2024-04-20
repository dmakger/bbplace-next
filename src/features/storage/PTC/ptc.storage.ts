import { EPTC } from "@/widgets/NavBarPTC/model/ptc.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IPTC {
    amount: number
    view?: EPTC
}

const initialState: IPTC = {
    amount: 0,
    view: EPTC.NONE,
}

export const PTCSlice = createSlice({
    name: 'ptc',
    initialState,
    reducers: {
        setPTC(state, action: PayloadAction<IPTC>) {            
            state.amount = action.payload.amount
            state.view = action.payload.view
        },
        setAmountPTC(state, action: PayloadAction<number>) {            
            state.amount = action.payload
        },
        setViewPTC(state, action: PayloadAction<EPTC>) {            
            state.view = action.payload
        },
    }
})

export const PTCReducer = PTCSlice.reducer
