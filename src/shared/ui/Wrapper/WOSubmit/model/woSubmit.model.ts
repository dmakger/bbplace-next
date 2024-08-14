/**
 * Используется в `WrapperWOSubmit`
 */
export type TriggerSubmitType = (submitFn: (callback: () => void) => void) => void;