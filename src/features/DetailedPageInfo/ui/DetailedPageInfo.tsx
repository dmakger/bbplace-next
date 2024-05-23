import { ReactNode, useState } from "react"
import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageInfo.module.scss'
import { IOption } from "@/shared/model/option.model"
import { SwitchSelector } from "@/shared/ui/SwitchSelector"

interface IDetailedPageInfo {
    className?: string,
    options: IOption[],
    defaultOption: IOption,
    optionsTab: ReactNode[],
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
            />
            <div className={cl.optionsTabContainer}>
                {optionsTab[selectedOption.id - 1]}
            </div>
        </div>
    )
}
