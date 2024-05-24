import { useState } from "react"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageInfo.module.scss'
import { IOption } from "@/shared/model/option.model"
import { SwitchSelector } from "@/shared/ui/SwitchSelector"
import { IOptionsTab } from "../model/detailedPageInfo.model"

interface IDetailedPageInfo {
    className?: string,
    options: IOption[],
    defaultOption: IOption,
    optionsTab: IOptionsTab
}

export const DetailedPageInfo = ({
    className,
    options,
    defaultOption,
    optionsTab
}: IDetailedPageInfo) => {

    const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption)

    return (
        <div className={cls(cl.DetailedPageInfo, className)}>
            <SwitchSelector
                className={cl.switchSelectorButton}
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                optionsTab={optionsTab}
            />
            {selectedOption.value && <div className={cl.optionsTabContainer}>
                {optionsTab[selectedOption.value].optionTab}
            </div>}
        </div>
    )
}
