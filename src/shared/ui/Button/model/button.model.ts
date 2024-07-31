export enum ButtonType {
    Button = 'button',
    Submit = 'submit',
}

export enum ButtonColor {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Negative = 'negative'
}

export enum ButtonSize {
    DefaultSize = 'defaultSize',
    Big = 'big',
    Medium = 'medium',
    Small = 'small',
}

export enum ButtonVariant{
    FILL = "fill new",
    TONAL = "tonal new",
    BORDER = "border new",
    CONTENT = "content new",

    DEFAULT = 'default',
    CLEAR = 'clear',
    BORDERED_RED_WIDE = 'bordered-red-wide',
    BORDERED_RED_NARROW = 'bordered-red-narrow',
    BACKGROUND_WHITE_WIDE = 'background-white-wide',
    BACKGROUND_WHITE_NARROW = 'background-white-narrow',
    BACKGROUND_RED = 'background-red',
    BACKGROUND_RED_HUGE = 'background-red-huge',
    ALMOST_RECTANGULAR = 'almost-rectangular',
    ALMOST_RECTANGULAR_RED = 'almost-rectangular-red',
    W_ARROW_RED = 'w-arrow-red',
    BACKGROUND_GRAY = 'background-gray',
    BORDERED_BLUE = 'bordered-blue'
}


export enum EMenuButtonVariant{
    LINK = 'link',
    LOCALIZATION = 'localization',
    PROFILE_BUTTONS = 'profile-buttons'
}

export interface IMenuButton {
    title?: string
    className?: string
    variant?: EMenuButtonVariant
    link?: string,
    notificationCounter?: string,
}