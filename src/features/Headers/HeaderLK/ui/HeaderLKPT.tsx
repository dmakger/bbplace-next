'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderLKPT.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
// import { ButtonArrowWLine } from "@/shared/ui/Button/Arrow/WLine/ButtonArrowWLine"
import { Axis } from "@/shared/model/button.model"
import { SwitchSelector } from "@/shared/ui/SwitchSelector"
import { IOption } from "@/shared/model/option.model"
import { OptionsTabType } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
// import { ButtonColor } from "@/shared/ui/Button/model/model"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { ESwitchSelectorVariants } from "@/shared/ui/SwitchSelector/model/switchSelector.model"
import { ButtonArrowWLine } from "@/shared/ui/Button/data/Arrow/WLine/ButtonArrowWLine"
import { ButtonColor } from "@/shared/ui/Button/model/button.model"

interface IHeaderPT {
    className?: string,
    isButtonAdd?: boolean,
    title: string,
    selectedOption: IOption,
    setSelectedOption: Function
    options: IOption[],
    optionsTab: OptionsTabType
}
/**
 * LKPT - Личный Кабинет Product Tender
 */
export const HeaderLKPT = ({
    className,
    isButtonAdd = true,
    title,
    selectedOption,
    setSelectedOption,
    options,
    optionsTab
}: IHeaderPT) => {

    //ROUTER
    const router = useRouter()

    //FUNCTION
    const backNavigation = () => {
        router.push(DASHBOARD_PAGES.HOME)
    }

    return (
        <div className={cls(cl.HeaderLKPT, className)}>
            <div className={cl.leftContainer}>
                <div className={cl.backNTitle}>
                    <ButtonArrowWLine
                        className={cl.backButton}
                        axis={Axis.Bottom}
                        onClick={backNavigation}
                        sizes={{width: 17, height: 17}}
                    />
                    <span className={cl.headerTitle}>{title}</span>
                </div>

                <SwitchSelector className={cl.switchSelector}
                    options={options}
                // options={[
                    //     SWITCH_SELECTOR_CREATED_PRODUCTS_OPTION, 
                    //     SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION, 
                    //     SWITCH_SELECTOR_DRAFT_PRODUCTS_OPTION
                    // ]} 
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    optionsTab={optionsTab}
                    variant={ESwitchSelectorVariants.TABS} />
            </div>
            {isButtonAdd &&
                <div className={cl.addButtonContainer}>
                    <Button variant={ButtonVariant.FILL}
                        color={ButtonColor.Primary}
                        title="Добавить"
                        className={cl.addButton}
                    />
                </div>
            }

        </div>
    )
}
