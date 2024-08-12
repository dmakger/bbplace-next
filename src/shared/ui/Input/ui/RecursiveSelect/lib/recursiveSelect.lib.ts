import { IOption } from "@/shared/model/option.model";
import { IRecursiveSelectInputsArray } from "../model/recursiveSelect.model";

export const createInputArray = (
    inputLevels: number, 
    updatedCategories: IOption[], 
    selectedOptionsCommonArray: IOption[],
    classNames: string[],
    placeholders: string[]
): IRecursiveSelectInputsArray[] => {
    const inputsArray: IRecursiveSelectInputsArray[] = [];
    
    for (let i = 0; i < inputLevels; i++) {
        inputsArray.push({
            currentOptions: i === 0 ? updatedCategories : selectedOptionsCommonArray[i - 1]?.options ?? [],
            defaultOption: selectedOptionsCommonArray[i],
            className: classNames[i] || '',
            placeholder: placeholders[i] || ''
        });
    }

    return inputsArray;
};