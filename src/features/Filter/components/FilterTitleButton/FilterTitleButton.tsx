import cl from './_FilterTitleButton.module.scss'
import Image from 'next/image'

interface IFilterTitleButton{
    isFiltersOpen: boolean,
    setIsFiltersOpen: (isFiltersOpen: boolean) => void
}


export const FilterTitleButton = ({
    isFiltersOpen,
    setIsFiltersOpen
}: IFilterTitleButton) => {
    return (
        <button type={'button'} className={cl.button} onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <h3>
                Фильтры
            </h3>
            <Image className={isFiltersOpen ? cl.arrowOpen : cl.arrow} src={'arrow.svg'} alt={'arrow'} width={14} height={12} />
        </button>
    )
}

