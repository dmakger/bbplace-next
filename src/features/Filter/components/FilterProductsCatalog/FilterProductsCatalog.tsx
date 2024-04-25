import cl from './_FilterProductsCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { STATUS_OPTIONS } from '../../data/filter.data'
import { Dispatch, RefObject, SetStateAction } from 'react'
import { cls } from '@/shared/lib/classes.lib'
import { FilterCountryOrCategoryInput, FilterMinOrderInput, FilterStatusOrApplicationInput } from '../FilterInputs'
import Input from '@/shared/ui/Input/Input'
import { EInputTextVariant } from '@/shared/ui/Input/Text/data/text.input.data'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'
import { CORE_PARAMS } from '@/config/params/core.params.config'

interface IFilterProductsCatalog {
    isFiltersOpen: boolean,
    categoryListOptions: IOption[],
    countryListOptions: IOption[],
    filter: ISortFilter,
    setFilter: Dispatch<SetStateAction<ISortFilter>>
    inputListRef: RefObject<HTMLDivElement>,
}

export const FilterProductsCatalog = ({
    isFiltersOpen,
    categoryListOptions,
    countryListOptions,
    inputListRef,
    filter,
    setFilter,
}: IFilterProductsCatalog) => {

    const handleOnClickCategory = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.CATEGORY]: it}))
    }

    const handleOnClickCountry = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.COUNTRY]: it}))
    }

    const handleOnClickStatus = (it: IOption) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.STATUS]: it}))
    }

    const handleOnClickMinOrder = (text: string) => {
        setFilter(prevState => ({...prevState, [CORE_PARAMS.MIN_ORDER_QUANTITY]: text}))
    }

    return (
        <div ref={inputListRef} className={cls(cl.FilterProductsCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <Input.TextAndSelect title={'Категории'}
                                 imageWidth={14} imageHeight={12}
                                 listOptions={categoryListOptions}
                                 defaultOption={filter[CORE_PARAMS.CATEGORY] as IOption}
                                 onClickOption={handleOnClickCategory} />
            
            <Input.TextAndSelect title='Страна'
                                 imageWidth={14} imageHeight={12}
                                 defaultOption={filter[CORE_PARAMS.COUNTRY] as IOption}
                                 listOptions={countryListOptions}
                                 onClickOption={handleOnClickCountry}/>
            <Input.Select title={'Статус товара'} 
                          width={14} height={12}
                          options={STATUS_OPTIONS}
                          defaultOption={filter[CORE_PARAMS.STATUS] as IOption}
                          onClickOption={handleOnClickStatus}/>
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

