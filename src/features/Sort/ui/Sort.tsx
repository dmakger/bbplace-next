import cl from './_Sort.module.scss'
import { cls } from "@/shared/lib/classes.lib"
import { SORT_BY_ALPHABETICAL_OPTIONS, SORT_BY_DATE_OPTIONS } from '..'
import { SortBy } from '../components'
import { ICatalogSort } from '../model/sort.model'
import { ECatalogVariants } from '@/widgets/SortFilterSidebar'
import { IOption } from '@/shared/model/option.model'

interface ISort{
    variant: ECatalogVariants,
    sortByDate: IOption,
    setSortByDate: Function,
    sortByAlphabetical: IOption,
    setSortByAlphabetical: Function,
}


export const Sort = ({
    variant = ECatalogVariants.PRODUCTS,
    sortByDate,
    setSortByDate,
    sortByAlphabetical,
    setSortByAlphabetical
}: ISort) => {

    const SORT_BY_DATE: ICatalogSort = {
        title: 'Дата публикации',
        options: SORT_BY_DATE_OPTIONS,
        defaultOption: sortByDate,
        classNameTitle: cl.sortSelect,
        onClickOption: setSortByDate
    }

    const SORT_BY_ALPHABETICAL: ICatalogSort = {
        title: 'По названию',
        options: SORT_BY_ALPHABETICAL_OPTIONS,
        defaultOption: sortByAlphabetical,
        classNameTitle: cl.sortSelect,
        onClickOption: setSortByAlphabetical
    }

    const sorts: ICatalogSort[] = variant === ECatalogVariants.PRODUCTS ? [SORT_BY_DATE] : [SORT_BY_DATE, SORT_BY_ALPHABETICAL];


    return (
        <div className={cl.Sort}>
            <h3>
                Сортировка
            </h3>
            <div className={cl.sortContainer}>
                {sorts.map(it => (
                    <SortBy
                        key={it.title}
                        title={it.title}
                        options={it.options}
                        defaultOption={it.defaultOption}
                        classNameTitle={it.classNameTitle}
                        onClickOption={it.onClickOption}
                    />
                ))}
            </div>
        </div>
    )
}
