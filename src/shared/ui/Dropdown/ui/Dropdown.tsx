'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_Dropdown.module.scss'
import { Button, ButtonVariant } from "../../Button"
import { ARROW_TERTIARY_WO_FULL_ICON } from "../../Icon/data/arrow.data.icon"
import { ReactNode, useEffect, useRef, useState } from "react"
import { DropdownList } from "../components/DropdownList"
import { IMenuItem } from "@/shared/model/menu.model"
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from "../../Wrapper/DropdownList/model/wrapperDropdownList.model"
import { WrapperDropdownList } from "../../Wrapper/DropdownList"
import { IMenuButton } from "../../Button/model/button.model"
import WrapperClickOutside from "../../Wrapper/ClickOutside/WrapperClickOutside"

interface IDropdown {
    className?: string,
    classNameWrapperDropdownList?: string,
    classNameWrapperDropdownListVisible?: string,
    labelTitle?: string,
    buttonChildren?: ReactNode,
    dropDownListData: IMenuItem[] | IMenuItem[][] | IMenuButton[] | IMenuButton[][]
    showListData?: boolean,
    setShowListData?: Function,
    dropDownListPosition?: EWrapperDropdownListPosition,
    dropDownListVariant?: EWrapperDropdownListVariant
}

export const Dropdown = ({
    className,
    classNameWrapperDropdownList,
    classNameWrapperDropdownListVisible,
    labelTitle,
    buttonChildren,
    dropDownListData,
    showListData,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT,
    dropDownListVariant = EWrapperDropdownListVariant.DESKTOP

}: IDropdown) => {
    //STATE
    const [showList, setShowList] = useState<boolean>(false)

    //REF
    const ref = useRef<HTMLDivElement>(null)

    //EFFECT
    useEffect(() => {
        if (showListData !== undefined) setShowList(showListData)
    }, [showListData])

    //FUNCTIONS
    const showDropdownList = () => setShowList(prevState => !prevState)

    return (
        <WrapperClickOutside className={cls(cl.Dropdown, cl[dropDownListPosition], className)} isShow={showList} _ref={ref} handle={setShowList}>
            {labelTitle && !buttonChildren ? (
                <Button
                    title={labelTitle}
                    className={cls(cl.labelButton, showList ? cl.active : '')}
                    variant={ButtonVariant.CLEAR}
                    afterImage={ARROW_TERTIARY_WO_FULL_ICON}
                    afterProps={{ width: 16, height: 9 }}
                    onClick={showDropdownList}
                />
            ) : (
                buttonChildren
            )}

            <WrapperDropdownList
                isVisible={showList}
                dropDownListPosition={dropDownListPosition}
                variant={dropDownListVariant}
                className={classNameWrapperDropdownList}
                classNameVisible={classNameWrapperDropdownListVisible}>

                {Array.isArray(dropDownListData[0])
                    ? (dropDownListData as IMenuItem[][] as IMenuButton[][]).map((list, index, array) => (
                        <div key={index}>
                            
                            <DropdownList listData={list} dropDownListPosition={dropDownListPosition} classNameButton={cls(index === 0 && dropDownListVariant !== EWrapperDropdownListVariant.MOBILE ? cl.firstEl : '')}
                                isLastList={index === array.length - 1 && dropDownListVariant !== EWrapperDropdownListVariant.MOBILE}
                            />
                            {index < array.length - 1 && list.length > 0 && <hr className={cl.border} />}
                        </div>
                    ))
                    : <DropdownList listData={dropDownListData as IMenuItem[]} dropDownListPosition={dropDownListPosition} isLastList setShowList={setShowList}/>
                }

            </WrapperDropdownList>
        </WrapperClickOutside>
    )
}
