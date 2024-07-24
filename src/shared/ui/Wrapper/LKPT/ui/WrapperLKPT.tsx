'use client'

import cl from './_WrapperLKPT.module.scss'
import { IOptionTab, OptionsTabType } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { HeaderLKPT } from "@/features/Headers/HeaderLK"
import { LKPTPage } from '@/features/LKPTPage'
import { cls } from "@/shared/lib/classes.lib"
import { IOption } from '@/shared/model/option.model'
import { SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE } from '@/shared/ui/SwitchSelector/data/switchSelector.data'
import { useEffect, useState } from "react"

interface IWrapperLKPT {
    className?: string
    startPage: IOption,
    pageTitle: string,
    optionsTab: OptionsTabType,
    options: IOption[],
    isButtonAdd?: boolean
}

export const WrapperLKPT = ({
    className,
    startPage = SWITCH_SELECTOR_PRODUCT_PAGE_SINGLE,
    pageTitle = 'Новый товар',
    optionsTab,
    options,
    isButtonAdd = true
}: IWrapperLKPT) => {

    //STATE
    const [selectedPage, setSelectedPage] = useState<IOption>(startPage)
    const [optionsTabArray, setOptionsTabArray] = useState<IOptionTab[]>([])

    //EFFECT
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
                isButtonAdd={isButtonAdd}
            />
            <LKPTPage optionsTab={optionsTabArray}
                selectedOption={selectedPage} />
        </div>
    )
}
