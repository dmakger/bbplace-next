import { IOption } from "@/shared/model/option.model";

export interface IWrapperRectangleInputChildren {
    success?: boolean;
    setSuccess?: Function,
    warning?: boolean,
    setWarning?: Function,
    setIsListOpen?: Function,
    setInputValueLength?: Function,
    checked?: boolean,
    setсhecked?: Function,
    setselectedoptionsarray?: Function,
    selectedoption?: IOption,
    setselectedoption?: Function,
    setErrorMessageArray?: Function
}

export enum ELabelPosition{
  TOP = 'top',
  RIGHT = 'right'
}