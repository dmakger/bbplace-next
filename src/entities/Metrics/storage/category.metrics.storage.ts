import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICategory } from "../model/category.metrics.model";


const initialState: ICategory[] = []

export const CategorySlice = createSlice({
    name: 'categoryList',
    initialState,
    reducers: {
        saveCategoryList(state, action: PayloadAction<ICategory[]>) {            
            state.splice(0, state.length, ...action.payload);
        },
    }
})

export const CategoryReducer = CategorySlice.reducer
