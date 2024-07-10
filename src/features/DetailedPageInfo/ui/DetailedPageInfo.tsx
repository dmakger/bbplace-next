import React, { useState } from "react"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageInfo.module.scss'
import { SwitchSelector } from "@/shared/ui/SwitchSelector"
import { IUserProductsTab, IDetailedProductOptionsTab } from "../model/detailedPageInfo.model"
import { convertObjectToArray } from "../lib/detailedPageInfo.lib"
import { IOption } from "@/shared/model/option.model"

interface IDetailedPageInfo {
    className?: string,
    options: IOption[],
    defaultOption: IOption,
    optionsTab: IUserProductsTab | IDetailedProductOptionsTab
}

export const DetailedPageInfo = ({
    className,
    options,
    defaultOption,
    optionsTab
}: IDetailedPageInfo) => {

    const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption)

    const productPageOptionsArray = convertObjectToArray(optionsTab);

    return (
        <div className={cls(cl.DetailedPageInfo, className)}>
            <SwitchSelector
                className={cl.switchSelectorButton}
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                optionsTab={optionsTab}
            />
            <div className={cl.optionsTabContainer}>
                {optionsTab && productPageOptionsArray.map(it => (
                    <React.Fragment key={it.key}>
                        {it.value.optionTab}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}