import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalDictionary, WordTranslation } from "../model/translate.model";
import { DEFAULT_LANGUAGE } from "@/shared/data/menu/lang.menu.data";
import { IOption } from "@/shared/model/option.model";

interface TranslateState {
    dictionary: GlobalDictionary;
    language: string;
    defaultLang: IOption
}

const initialState: TranslateState = {
    dictionary: {},
    language: 'ru', 
    defaultLang: DEFAULT_LANGUAGE
};

export const TranslateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {
        setNewWord(state, action: PayloadAction<string>) {
            const word = action.payload;
            
            if (!state.dictionary[word]) {
                state.dictionary[word] = {
                    ru: word, 
                    [state.language]: '' 
                };
            } else if (!state.dictionary[word].ru) {
                state.dictionary[word].ru = word;
            }
        },        
        setTranslation(state, action: PayloadAction<WordTranslation>) {
            const { word, translation, language } = action.payload;

            if (state.dictionary[word]) {
                state.dictionary[word][language] = translation;
            }
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload; 
        }
    }
});

export const TranslateReducer = TranslateSlice.reducer;
