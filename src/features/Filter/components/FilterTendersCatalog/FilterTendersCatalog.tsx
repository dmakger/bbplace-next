import { IOption } from '@/shared/model/option.model'
import { APPLICATION_OPTIONS } from '../../data/filter.data'
import cl from './_FilterTendersCatalog.module.scss'
import Input from '@/shared/ui/Input/Input'
import { cls } from '@/shared/lib/classes.lib'
import { RefObject } from 'react'

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
            <h4>Тип заявки</h4>
            <Input.Select
                name="selectStatus"
                options={APPLICATION_OPTIONS}
                defaultOption={application}
                width={14}
                height={12}
                onClickOption={setApplication}
            />
        </div>
    )
}

