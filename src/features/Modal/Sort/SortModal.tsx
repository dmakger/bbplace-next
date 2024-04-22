import { FC, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_SortModal.module.scss'
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { Modal } from "@/shared/ui/Modal/Modal";
import { ButtonSort } from "@/shared/ui/Button/Sort/ButtonSort";
import { EModalView } from "@/shared/data/modal.data";

interface SortModalProps{
    variant?: ECatalogVariants
    className?: string,
}

export const SortModal:FC<SortModalProps> = ({variant=ECatalogVariants.NONE, className}) => {
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
                <ButtonSort onClick={handleOnClick}/>
            }
            className={cls(className)}>
            <SortFilterSidebar variant={variant} className={cl.sidebar}/>
        </Modal>
    )
}
