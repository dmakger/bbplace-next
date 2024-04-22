import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SortModal.module.scss'
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { Modal } from "@/shared/ui/Modal/Modal";
import { ButtonSort } from "@/shared/ui/Button/Sort/ButtonSort";
import { EModalView } from "@/shared/data/modal.data";

interface SortModalProps{
    hasOutline?: boolean
    variant?: ECatalogVariants
    classNameModal?: string,
    classNameButton?: string,
}

export const SortModal:FC<SortModalProps> = ({hasOutline=false, variant=ECatalogVariants.NONE, classNameModal, classNameButton}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(prevState => !prevState)
    }

    return (
        <Modal 
            _isOpen={isOpen} 
            onClickOverlay={handleOnClick}
            view={EModalView.RIGHT}  
            buttonNode={
                <ButtonSort onClick={handleOnClick} hasOutline={hasOutline} className={classNameButton}/>
            }
            className={classNameModal}>
            <SortFilterSidebar variant={variant} className={cl.sidebar}/>
        </Modal>
    )
}
