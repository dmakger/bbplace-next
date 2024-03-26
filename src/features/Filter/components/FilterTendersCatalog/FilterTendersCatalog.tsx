import { IOption } from '@/shared/model/option.model'
import { APPLICATION_OPTIONS } from '../../data/filter.data'
import cl from './_FilterTendersCatalog.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { RefObject } from 'react'
import { FilterStatusOrApplicationInput } from '../FilterInputs'

interface IFilterTendersCatalog {
    isFiltersOpen: boolean,
    application: IOption,
    setApplication: Function,
    inputListRef: RefObject<HTMLDivElement>,
}


export const FilterTendersCatalog = ({
    isFiltersOpen,
    application,
    setApplication,
    inputListRef
}: IFilterTendersCatalog) => {

    return (
        <div ref={inputListRef} className={cls(cl.FilterTendersCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <FilterStatusOrApplicationInput
                title='Тип заявки'
                defaultOption={application}
                listOptions={APPLICATION_OPTIONS}
                onClickOption={setApplication}
            />
        </div>
    )
}

