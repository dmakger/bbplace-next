'use client'

import cl from './_WrapperLKPT.module.scss'
import { IOptionTab, OptionsTabType } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { HeaderLKPT } from '@/features/Headers/HeaderLKPT'
import { LKPTPage } from '@/features/LKPTPage'
import { cls } from "@/shared/lib/classes.lib"
import { IOption } from '@/shared/model/option.model'
import { IButton } from '@/shared/ui/Button/ui/Button'
import { SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE } from '@/shared/ui/SwitchSelector/data/switchSelector.data'
import { useEffect, useState } from "react"

interface IWrapperLKPT {
    startPage?: IOption,
    currentKey?: string
    pageTitle: string,
    optionsTab: OptionsTabType,
    options: IOption[],
    buttonBackProps?: IButton,
    isButtonRight?: boolean,
    buttonRightTitle?: string
    buttonRightProps?: IButton,
    className?: string
    classNamePage?: string
}

export const WrapperLKPT = ({
    startPage,
    currentKey,
    pageTitle = 'Новый товар',
    optionsTab, options,
    buttonBackProps,
    isButtonRight, buttonRightProps,
    buttonRightTitle,
    className, classNamePage,
}: IWrapperLKPT) => {

    //STATE
    const [selectedPage, setSelectedPage] = useState<IOption | undefined>(startPage)
    const [optionsTabArray, setOptionsTabArray] = useState<IOptionTab[]>([])

    //EFFECT
    useEffect(() => {
        if (currentKey && currentKey !== selectedPage?.value) {
            setSelectedPage(prev => options.find(opt => opt.value === currentKey) ?? prev)
        } else if (startPage && startPage.id !== selectedPage?.id) {
            setSelectedPage(startPage)
        } else if (options.length > 0 && selectedPage === undefined) {
            setSelectedPage(options[0])
        }
    }, [currentKey, startPage])

    useEffect(() => {
        const convertToArray = (optionsTab: OptionsTabType): IOptionTab[] => {
            return Object.values(optionsTab).filter((option): option is IOptionTab => option !== undefined);
        };
        setOptionsTabArray(convertToArray(optionsTab))
    }, [optionsTab])


    return (
        <div className={cls(cl.WrapperLKPT, className)}>
            <HeaderLKPT title={pageTitle}
                options={options}
                optionsTab={optionsTab}
                selectedOption={selectedPage}
                setSelectedOption={setSelectedPage}
                buttonBackProps={buttonBackProps}
                buttonRightTitle={buttonRightTitle}
                isButtonRight={isButtonRight} 
                buttonRightProps={buttonRightProps}
            />
            {selectedPage && (
                <LKPTPage optionsTab={optionsTabArray} selectedOption={selectedPage} 
                            className={classNamePage}/>
            )}
        </div>
    )
}
