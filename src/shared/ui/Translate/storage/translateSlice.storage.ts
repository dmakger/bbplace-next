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
            if (!state.dictionary[action.payload]) { // Проверяем, есть ли слово в словаре
                state.dictionary[action.payload] = {
                    ru: action.payload,
                    en: ''
                };
            }
        },
        setTranslation(state, action: PayloadAction<WordTranslation>) {
            const { word, translation } = action.payload;

            if (state.dictionary[word]) {
                state.dictionary[word].en = translation;
            }
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload; // Обновляем текущий язык
        }
    }
});

export const TranslateReducer = TranslateSlice.reducer;
