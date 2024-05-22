import { useState } from "react"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_TenderPageMainInfo.module.scss'
import { IPurchaseTender, ISaleTender } from "../../../model/tender.model"
import { IOption } from "@/shared/model/option.model"
import { SwitchSelector } from "@/features/SwitchSelector"
import { SWITCH_SELECTOR_TENDER_OPTIONS } from "../../../data/tender.data"

interface ITenderPageMainInfo {
    className?: string,
    tender: IPurchaseTender | ISaleTender

}

export const TenderPageMainInfo = ({
    className,
    tender
}: ITenderPageMainInfo) => {

    const [selectedOption, setSelectedOption] = useState<IOption>(SWITCH_SELECTOR_TENDER_OPTIONS[0])

    return (
        <div className={cls(cl.TenderPageMainInfo, className)}>
            <SwitchSelector 
            className={cl.switchSelectorButton}
            options={SWITCH_SELECTOR_TENDER_OPTIONS}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            <p className={cl.tenderInfo}>
                {tender.description}
            </p>
        </div>
    )
}
