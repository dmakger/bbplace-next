import { cls } from "@/shared/lib/classes.lib"
import cl from './_DropdownList.module.scss'
import { IMenuItem } from "@/shared/model/menu.model"
import { EWrapperDropdownListPosition } from "../../Wrapper/DropdownList/model/wrapperDropdownList.model"
import { MenuButton } from "../../Button/data/Menu/MenuButton"
import { EMenuButtonVariant, IMenuButton } from "../../Button/model/button.model"

interface IDropdownList {
    className?: string,
    classNameButton?: string,
    listData: IMenuItem[] | IMenuButton[],
    isLastList?: boolean,
    dropDownListPosition?: EWrapperDropdownListPosition,
    setIsOpenModal?: Function,
    setShowList?: Function
}


export const DropdownList = ({
    className,
    classNameButton,
    isLastList,
    listData,
    dropDownListPosition = EWrapperDropdownListPosition.LEFT,
    setIsOpenModal,
    setShowList
}: IDropdownList) => {

    const isMenuNoLinkButton = (item: IMenuItem | IMenuButton): item is IMenuButton => {
        return (item as IMenuButton).variant !== EMenuButtonVariant.LINK;
    }

    const handleClick = () => {
        setShowList && setShowList(false);
        setIsOpenModal && setIsOpenModal(false)
    }
    
    return (
        <ul className={cls(cl.DropdownList, cl[dropDownListPosition], className)}>
            {listData?.map((it, index) => {
                const isLastEl = index === listData.length - 1;
                const noBorderBottomClass = listData[index + 1] && isMenuNoLinkButton(listData[index + 1]) || isLastEl;
                return (
                    <li key={index}>
                        <MenuButton
                            title={it.title}
                            link={it.link}
                            className={cls(
                                cl.menuButton,
                                isLastList && isLastEl ? cl.lastEl : '',
                                noBorderBottomClass ? cl.noBorderBottom : '',
                                classNameButton)}
                            variant={isMenuNoLinkButton(it) ? it.variant : undefined}
                            onClick={handleClick}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
