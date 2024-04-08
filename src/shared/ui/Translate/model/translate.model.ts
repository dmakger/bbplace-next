export interface ITranslateRequest {
    text: string[];
    targetLanguage: string;
}

export type ITranslateResponse = {
    translations: {
        text: string;
        detectedLanguageCode: string;
    }[];
}

export interface WordTranslations {
    [language: string]: string;
}

export type GlobalDictionary = Record<string, WordTranslations>;

export interface WordTranslation {
    word: string;
    translation: string;
}