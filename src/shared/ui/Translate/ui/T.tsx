'use client'

import React, { FC, ReactNode, useEffect, useState, useCallback } from "react";
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { TranslateAPI } from "..";
import { DEFAULT_LANGUAGE } from "@/shared/data/menu/lang.menu.data";

interface ITranslate {
    children: ReactNode,
}

export const T: FC<ITranslate> = ({ children }) => {
    // API
    const [fetchTranslate] = TranslateAPI.useTranslateMutation();

    //REDUX
    const language = useAppSelector(state => state.translate.language);
    const dictionary = useAppSelector(state => state.translate.dictionary[String(children)]);
    const actionCreators = useActionCreators();

    console.log(dictionary);
    
    //STATE
    const [word, setWord] = useState<string>(String(children));

    const translate = useCallback(async () => {
        try {
            const newTranslation = await fetchTranslate({ targetLanguage: language, text: [word] }).unwrap();
            actionCreators.setTranslation({ word, translation: newTranslation.translations[0].text, language });
        } catch (error) {
            console.error("Translation error:", error);
        }
    }, [fetchTranslate, actionCreators, language, word]);

    useEffect(() => {
        if (!dictionary) {
            actionCreators.setNewWord(String(children));
            setWord(String(children));
        }
    }, [children, dictionary, actionCreators]);

    useEffect(() => {
        if (language !== DEFAULT_LANGUAGE.value && dictionary && !dictionary[language]) {
            translate();
        }
    }, [language, dictionary, translate]);

    return (
        <>
            {dictionary && dictionary[language] && dictionary[language] ? dictionary[language] : word}
        </>
    );
};
