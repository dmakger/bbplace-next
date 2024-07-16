import { cls } from "@/shared/lib/classes.lib"
import cl from './_LKPTPage.module.scss'
import { ICreateNewProductsTab, IDetailedProductOptionsTab, IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { IOption } from "@/shared/model/option.model"

interface ILKPTPage {
    className?: string,
    optionsTab:  IUserProductsTab | IDetailedProductOptionsTab | ICreateNewProductsTab,
    selectedoption: IOption
}

export const LKPTPage = ({
    className,
    optionsTab,
    selectedoption,
}: ILKPTPage) => {
    return (
        <div className={cls(cl.LKPTPage, className)}>
            {selectedoption && selectedoption.value && optionsTab[selectedoption.value] &&
                <>
                    {optionsTab[selectedoption.value]?.optionTab}
                </>
            }
        </div>
    )
}
