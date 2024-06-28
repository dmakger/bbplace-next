import { cls } from "@/shared/lib/classes.lib"
import cl from './_LKPTPage.module.scss'
import { ICreateNewProductsTab, IDetailedProductOptionsTab, IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { IOption } from "@/shared/model/option.model"

interface ILKPTPage {
    className?: string,
    optionsTab:  IUserProductsTab | IDetailedProductOptionsTab | ICreateNewProductsTab,
    selectedOption: IOption
}

export const LKPTPage = ({
    className,
    optionsTab,
    selectedOption,
}: ILKPTPage) => {
    return (
        <div className={cls(cl.LKPTPage, className)}>
            {selectedOption && selectedOption.value && optionsTab[selectedOption.value] &&
                <>
                    {optionsTab[selectedOption.value]?.optionTab}
                </>
            }
        </div>
    )
}
