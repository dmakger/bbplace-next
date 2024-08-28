import { WrapperColumnNoGap } from '@/shared/ui/Wrapper/ColumnNoGap'
import cl from './_DropDownCatalog.module.scss'
import { Dropdown } from '@/shared/ui/Dropdown'
import { MenuItem } from '@/shared/ui/Button/data/MenuItem/MenuItem'
import { MARK_MENU_ITEM_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { IMenuItem } from '@/shared/model/menu.model'
import { IMenuButton } from '@/shared/ui/Button/model/button.model'
import { ReactNode } from 'react'
import { EWrapperDropdownListPosition, EWrapperDropdownListVariant } from '@/shared/ui/Wrapper/DropdownList/model/wrapperDropdownList.model'
import { cls } from '@/shared/lib/classes.lib'
import { Modal } from '@/shared/ui/Modal/ui/Modal/Modal'
import { EModalView } from '@/shared/data/modal.data'

interface IDropDownCatalog {

    modalView?: EModalView,
    isOpenModal: boolean,
    setIsOpenModal: Function,
    classNameModal?: string,

    title?: string,
    className?: string,

    classNameFirstDropDownWrapper?: string,
    classNameFirstDropDownWrapperVisible?: string,
    firstDropDownListData?: IMenuItem[] | IMenuItem[][] | IMenuButton[] | IMenuButton[][]
    showFirstListData?: boolean,
    firstDropDownButtonChildren?: ReactNode,

    dropDownListVariant?: EWrapperDropdownListVariant
    dropDownListPosition?: EWrapperDropdownListPosition,

    secondDropDownListData: IMenuItem[] | IMenuItem[][] | IMenuButton[] | IMenuButton[][],

    onClickXMark: Function
}

export const DropDownCatalog = ({
    modalView = EModalView.RIGHT,
    isOpenModal,
    setIsOpenModal,
    classNameModal,

    title,
    className,

    classNameFirstDropDownWrapper,
    classNameFirstDropDownWrapperVisible,
    firstDropDownListData,
    showFirstListData,
    firstDropDownButtonChildren,
    dropDownListVariant,
    dropDownListPosition,

    secondDropDownListData,

    onClickXMark
}: IDropDownCatalog) => {
    return (
        <Modal
            view={modalView}
            isOpen={isOpenModal}
            buttonNode
            onClickOverlay={onClickXMark}
            classNameSidebar={classNameModal}
        >
            <div className={cls(cl.DropDownCatalog, className)}>
                <WrapperColumnNoGap>

                    {title && !firstDropDownButtonChildren && <div className={cl.titleContainer}>
                        <h5 className={cl.title}>{title}</h5>
                    </div>}
                    
                    {firstDropDownButtonChildren && firstDropDownListData && <Dropdown
                        classNameWrapperDropdownList={cls(cl.dropdownProfileButtons, classNameFirstDropDownWrapper)}
                        classNameWrapperDropdownListVisible={cls(cl.dropdownProfileButtonsVisible, classNameFirstDropDownWrapperVisible)}
                        dropDownListData={firstDropDownListData}
                        showListData={showFirstListData ?? false}
                        buttonChildren={firstDropDownButtonChildren}
                        dropDownListVariant={dropDownListVariant}
                        dropDownListPosition={dropDownListPosition}
                        setIsOpenModal={setIsOpenModal} />}

                    <Dropdown
                        dropDownListData={secondDropDownListData}
                        showListData
                        dropDownListVariant={dropDownListVariant}
                        dropDownListPosition={dropDownListPosition}
                        setIsOpenModal={setIsOpenModal} />
                </WrapperColumnNoGap>

                <MenuItem title="Закрыть"
                    className={cl.closeButton}
                    onClick={onClickXMark}
                    beforeImage={MARK_MENU_ITEM_ICON}
                />
            </div>
        </Modal>
    )
}
