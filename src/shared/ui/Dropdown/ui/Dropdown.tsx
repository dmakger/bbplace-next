'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_Dropdown.module.scss'
import { Button, ButtonVariant } from "../../Button"
import { ARROW_TERTIARY_WO_FULL_ICON } from "../../Icon/data/arrow.data.icon"
import { ReactNode, useEffect, useState } from "react"
import { DropdownList } from "../components/DropdownList"
import { IMenuItem } from "@/shared/model/menu.model"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "../../Wrapper/Dropdown/model/wrapperDropdownList.model"
import { WrapperDropdownList } from "../../Wrapper/Dropdown"
import { IMenuButton } from "../../Button/model/button.model"

interface IDropdown {
    className?: string,
    labelTitle?: string,
    buttonChildren?: ReactNode,
    dropDownListData:  IMenuItem[] | IMenuItem[][] | IMenuButton[] | IMenuButton[][]
    showListData?: boolean,
    setShowListData?: Function,
    dropDownListPosition?: EWrapperDropdownListPosition,
    dropDownListVariant?: EWrapperDropdownListVariant
}

export const Dropdown = ({
    className,
    labelTitle,
    buttonChildren,
    dropDownListData,
    showListData,
    setShowListData,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT,
    dropDownListVariant = EWrapperDropdownListVariant.DESKTOP

}: IDropdown) => {
    //STATE
    const [showList, setShowList] = useState<boolean>(false)

    //EFFECT
    useEffect(() => {
        if (showListData !== undefined) setShowList(showListData)
    }, [showListData])

    //FUNCTIONS
    const showDropdownList = () => setShowList(prevState => !prevState)

    return (
        <div className={cls(cl.Dropdown, cl[dropDownListPosition], className)}>
        {labelTitle && !buttonChildren
                ? <Button title={labelTitle} className={cls(cl.labelButton, showList ? cl.active : '')} variant={ButtonVariant.CLEAR} afterImage={ARROW_TERTIARY_WO_FULL_ICON} afterProps={{ width: 16, height: 9 }} onClick={showDropdownList} />

                : buttonChildren}

            <WrapperDropdownList isVisible={showList} dropDownListPosition={dropDownListPosition} variant={dropDownListVariant}>
            {Array.isArray(dropDownListData[0])
                    ? (dropDownListData as IMenuItem[][] as IMenuButton[][]).map((list, index, array) => (
                        <div key={index}>
                            <DropdownList listData={list} dropDownListPosition={dropDownListPosition} classNameButton={cls(index === 0 && dropDownListVariant !== EWrapperDropdownListVariant.MOBILE ? cl.firstEl : '')}
                            isLastList={index === array.length - 1 && dropDownListVariant !== EWrapperDropdownListVariant.MOBILE}     
                        />
                            {index < array.length - 1 && <div className={cl.border} />}
                        </div>
                    ))
                    : <DropdownList listData={dropDownListData as IMenuItem[]} dropDownListPosition={dropDownListPosition} isLastList/>
                }

            </WrapperDropdownList>
        </div>
    )
}
