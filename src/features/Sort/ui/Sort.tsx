import cl from './_Sort.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { SORT_BY_ALPHABETICAL_OPTIONS, SORT_BY_DATE_OPTIONS } from '..'
import { SortBy } from '../components'
import { ICatalogSort } from '../model/sort.model'
import { ECatalogVariants } from '@/widgets/SortFilterSidebar'
import { IOption } from '@/shared/model/option.model'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'
import { Dispatch, SetStateAction } from 'react'
import Input from '@/shared/ui/Input/Input'
import { CORE_PARAMS } from '@/config/params/core.params.config'

interface ISort{
    variant: ECatalogVariants,
    filter: ISortFilter
    setFilter: Dispatch<SetStateAction<ISortFilter>>
}


export const Sort = ({ variant = ECatalogVariants.PRODUCTS, filter, setFilter }: ISort) => {

    const SORT_BY_DATE: ICatalogSort = {
        title: 'Дата публикации',
        options: SORT_BY_DATE_OPTIONS,
        // defaultOption: filter.sortByDate,
        defaultOption: filter[CORE_PARAMS.SORT_KEYS.DATE_START] as IOption,
        classNameTitle: cl.sortSelect,
        onClickOption: (it: IOption) => {setFilter(prevState => ({...prevState, [CORE_PARAMS.SORT_KEYS.DATE_START]: it}))} 
    }

    const SORT_BY_ALPHABETICAL: ICatalogSort = {
        title: 'По названию',
        options: SORT_BY_ALPHABETICAL_OPTIONS,
        // defaultOption: filter.sortByAlphabetical,
        defaultOption: filter[CORE_PARAMS.SORT_KEYS.ALPHABETICAL] as IOption,
        classNameTitle: cl.sortSelect,
        onClickOption: (it: IOption) => {setFilter(prevState => ({...prevState, [CORE_PARAMS.SORT_KEYS.ALPHABETICAL]: it}))} 
    }

    const sorts: ICatalogSort[] = variant === ECatalogVariants.PRODUCTS ? [SORT_BY_DATE] : [SORT_BY_DATE, SORT_BY_ALPHABETICAL];


    return (
        <div className={cl.Sort}>
            <h3>
                Сортировка
            </h3>
            <div className={cl.sortContainer}>
                {sorts.map((it, index) => (
                    <Input.Select
                        name='selectSort'
                        title={it.title}
                        options={it.options}
                        defaultOption={it.defaultOption}
                        onClickOption={it.onClickOption} 
                        key={index} />
                ))}
            </div>
        </div>
    )
}
