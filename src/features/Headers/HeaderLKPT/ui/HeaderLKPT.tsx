'use client'
import { cls } from "@/shared/lib/classes.lib"
import cl from './_HeaderLKPT.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Axis } from "@/shared/model/button.model"
import { SwitchSelector } from "@/shared/ui/SwitchSelector"
import { IOption } from "@/shared/model/option.model"
import { OptionsTabType } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { useRouter } from "next/navigation"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { ESwitchSelectorVariants } from "@/shared/ui/SwitchSelector/model/switchSelector.model"
import { ButtonArrowWLine } from "@/shared/ui/Button/data/Arrow/WLine/ButtonArrowWLine"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"
import { IButton } from "@/shared/ui/Button/ui/Button"

interface IHeaderPT {
    title: string,
    buttonBackProps?: IButton
    isButtonRight?: boolean,
    buttonRightTitle?: string
    buttonRightProps?: IButton,
    selectedOption: IOption,
    setSelectedOption: Function
    options: IOption[],
    optionsTab: OptionsTabType
    className?: string,
}
/**
 * LKPT - Личный Кабинет Product Tender
 */
export const HeaderLKPT = ({
    title,
    buttonBackProps,
    buttonRightTitle = 'Добавить',
    isButtonRight = true, buttonRightProps,
    selectedOption, setSelectedOption,
    options,optionsTab,
    className,
}: IHeaderPT) => {

    //ROUTER
    const router = useRouter()

    //FUNCTION
    const backNavigation = () => {
        router.push(DASHBOARD_PAGES.HOME.path)
    }

    return (
        <div className={cls(cl.HeaderLKPT, className)}>
            <div className={cls(cl.leftContainer, !title ? cl.noTitle : '')}>
                <div className={cl.backNTitle}>
                    <ButtonArrowWLine
                        className={cl.backButton}
                        axis={Axis.Bottom}
                        onClick={backNavigation}
                        sizes={{width: 17, height: 17}}
                        {...buttonBackProps}
                    />
                    {title && <span className={cl.headerTitle}>{title}</span>}
                </div>

                <SwitchSelector className={cl.switchSelector}
                    options={options} 
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    optionsTab={optionsTab}
                    variant={ESwitchSelectorVariants.TABS} />
            </div>
            {isButtonRight &&
                <div className={cl.buttonRightContainer}>
                    <Button variant={ButtonVariant.FILL}
                        size={ButtonSize.Big}
                        color={ButtonColor.Primary}
                        title={buttonRightTitle}
                        className={cl.buttonRight}
                        classNameLink={cl.buttonRightLink}
                        {...buttonRightProps}
                    />
                </div>
            }

        </div>
    )
}
