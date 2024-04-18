import { IOption } from '@/shared/model/option.model'
import { APPLICATION_OPTIONS } from '../../data/filter.data'
import cl from './_FilterTendersCatalog.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { Dispatch, RefObject, SetStateAction } from 'react'
import { FilterStatusOrApplicationInput } from '../FilterInputs'
import Input from '@/shared/ui/Input/Input'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'
import { CORE_PARAMS } from '@/config/params/core.params.config'

interface IFilterTendersCatalog {
    isFiltersOpen: boolean,
    filter: ISortFilter,
    setFilter: Dispatch<SetStateAction<ISortFilter>>
    inputListRef: RefObject<HTMLDivElement>,
}


export const FilterTendersCatalog = ({
    isFiltersOpen,
    filter,
    setFilter,
    inputListRef
}: IFilterTendersCatalog) => {

    const handleOnClickApplication = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.APPLICATION]: it}))
    }

    return (
        <div ref={inputListRef} className={cls(cl.FilterTendersCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <Input.Select title={'Тип заявки'}
                          options={APPLICATION_OPTIONS}
                          defaultOption={filter[CORE_PARAMS.APPLICATION] as IOption}
                          onClickOption={handleOnClickApplication}
                          width={14} height={12} />
        </div>
    )
}

