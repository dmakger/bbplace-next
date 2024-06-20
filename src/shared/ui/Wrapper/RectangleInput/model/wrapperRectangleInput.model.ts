export interface IWrapperRectangleInputChildren {
    success?: boolean;
    setSuccess?: Function,
    warning?: boolean,
    setWarning?: Function,
    setIsListOpen?: Function,
    setInputValueLength?: Function,
    checked?: boolean,
    setChecked?: Function
}

export enum ELabelPosition{
  TOP = 'top',
  RIGHT = 'right'
}