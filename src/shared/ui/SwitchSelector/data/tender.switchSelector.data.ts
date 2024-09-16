import { IOption } from "@/shared/model/option.model"

export enum SwitchSelectorTender {
    Purchase = 'purchase',
    Sale = 'sale',
}


export const SWITCH_SELECTOR__PURCHASE_TENDER__OPTION: IOption = {
    id: 8,
    name: 'Покупка',
    value: SwitchSelectorTender.Purchase,
}

export const SWITCH_SELECTOR__SALE_TENDER__OPTION: IOption = {
    id: 9,
    name: 'Продажа',
    value: SwitchSelectorTender.Sale,
}

export const SWITCH_SELECTOR__TENDER__OPTIONS: IOption[] = [
    SWITCH_SELECTOR__PURCHASE_TENDER__OPTION,
    SWITCH_SELECTOR__SALE_TENDER__OPTION,
]