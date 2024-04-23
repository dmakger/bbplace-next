import { Dispatch, RefObject, SetStateAction } from 'react'
import cl from './_FilterCompaniesCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { FilterCountryOrCategoryInput, FilterMinOrderInput } from '../FilterInputs'
import Input from '@/shared/ui/Input/Input'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'
import { CORE_PARAMS } from '@/config/params/core.params.config'
import { EInputTextVariant } from '@/shared/ui/Input/Text/data/text.input.data'


interface IFilterCompaniesCatalog {
    isFiltersOpen: boolean,
    categoryListOptions: IOption[],
    countryListOptions: IOption[],
    filter: ISortFilter,
    setFilter: Dispatch<SetStateAction<ISortFilter>>
    inputListRef: RefObject<HTMLDivElement>,
}

export const FilterCompaniesCatalog = ({
    isFiltersOpen,
    categoryListOptions,
    countryListOptions,
    filter,
    setFilter,
    inputListRef,
}: IFilterCompaniesCatalog) => {
    const handleOnClickCategory = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.CATEGORY]: it}))
    }

    const handleOnClickCountry = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.COUNTRY]: it}))
    }

    const handleOnClickMinOrder = (text: string) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.MIN_ORDER_QUANTITY]: text}))
    }
    
    return (
        <div ref={inputListRef} className={cls(cl.FilterCompaniesCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <Input.TextAndSelect title={'Категории'}
                                 imageWidth={14} imageHeight={12}
                                 listOptions={categoryListOptions}
                                 defaultOption={filter[CORE_PARAMS.CATEGORY] as IOption}
                                 onClickOption={handleOnClickCategory} />
            <Input.TextAndSelect title={'Страна'}
                                 imageWidth={14} imageHeight={12}
                                 listOptions={countryListOptions}
                                 defaultOption={filter[CORE_PARAMS.COUNTRY] as IOption}
                                 onClickOption={handleOnClickCountry} />
            <Input.Text title={'Минимальный заказ от'}
                        name="minOrder"
                        type='number'
                        placeholder='Введите число'
                        variant={EInputTextVariant.W_HOVERED}
                        defaultValue={filter[CORE_PARAMS.MIN_ORDER_QUANTITY] as string}
                        onChange={handleOnClickMinOrder} />
        </div>
    )
}

