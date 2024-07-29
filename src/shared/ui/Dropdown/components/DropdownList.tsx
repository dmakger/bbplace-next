import { cls } from "@/shared/lib/classes.lib"
import cl from './_DropdownList.module.scss'
import { IMenuItem } from "@/shared/model/menu.model"
import { EWrapperDropdownListPosition } from "../../Wrapper/DropdownList/model/wrapperDropdownList.model"
import { MenuButton } from "../../Button/data/Menu/MenuButton"
import { IMenuButton } from "../../Button/model/button.model"

interface IDropdownList {
    className?: string,
    classNameButton?: string,
    listData: IMenuItem[] | IMenuButton[],
    isLastList?: boolean,
    dropDownListPosition?: EWrapperDropdownListPosition,
}


export const DropdownList = ({
    className,
    classNameButton,
    isLastList,
    listData,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT
}: IDropdownList) => {

    const isMenuButton = (item: IMenuItem | IMenuButton): item is IMenuButton => {
        return (item as IMenuButton).variant !== undefined;
    }
    
    return (
        <ul className={cls(cl.DropdownList, cl[dropDownListPosition], className)}>
            {listData?.map((it, index) => {
                const isLastEl = index === listData.length - 1;
                const noBorderBottomClass = listData[index + 1] && isMenuButton(listData[index + 1]) || isLastEl;
                return (
                    <li key={index}>
                        <MenuButton
                            title={it.title}
                            link={it.link}
                            className={cls(
                                isLastList && isLastEl ? cl.lastEl : '',
                                noBorderBottomClass ? cl.noBorderBottom : '',
                                classNameButton)}
                            variant={isMenuButton(it) ? it.variant : undefined}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
