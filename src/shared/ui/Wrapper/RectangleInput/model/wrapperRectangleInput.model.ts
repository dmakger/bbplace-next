import { IOption } from "@/shared/model/option.model";

export interface IWrapperRectangleInputChildren {
    checkboxId?: string,
    success?: boolean;
    setSuccess?: Function,
    warning?: boolean,
    setWarning?: Function,
    setIsListOpen?: Function,
    setInputValueLength?: Function,
    checked?: boolean,
    setChecked?: Function,
    setSelectedOptionsArray?: Function,
    selectedOption?: IOption,
    setSelectedOption?: Function,
    setErrorMessageArray?: Function
}

export enum ELabelPosition{
  TOP = 'top',
  RIGHT = 'right'
}

export enum EInputsContainerDirection{
  ROW = 'row',
  COLUMN = 'column',
  ROW_WRAP = 'row-wrap'
}