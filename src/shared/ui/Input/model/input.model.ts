export interface IInput{
    variant?: EInputVariants,
    size?: EInputSizes,
    className?: string,
    name?: string,
    placeholder?: string
    onChange?: Function,
    required?: boolean,
}

export enum EInputVariants{
    ROUNDED = 'rounded',
    RECTANGULAR = 'rectangular'
}

export enum EInputSizes{
    NONE = 'none',
    DEFAULT = 'default',
    SMALL = 'small'
}
