import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_FilterTitleButton.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { ARROW_WO_ICON } from '@/shared/ui/Icon/data/arrow.data.icon'
import { Axis } from '@/shared/model/button.model'

interface IFilterTitleButton{
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}


export const FilterTitleButton = ({
    isOpen,
    setIsOpen,
}: IFilterTitleButton) => {

    // HANDLE
    const handleOnClick = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <Button variant={ButtonVariant.DEFAULT}
                title={"Фильтры"} onClick={handleOnClick}
                afterImage={ARROW_WO_ICON} afterProps={{width: 14, height: 14, alt: 'arrow', axis: isOpen ? Axis.Right : Axis.Left}} 
                className={cl.button} />
    )
}

