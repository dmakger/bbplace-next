import { Dispatch, RefObject, SetStateAction } from 'react'
import cl from './_FilterCompaniesCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import { FilterCountryOrCategoryInput, FilterMinOrderInput } from '../FilterInputs'
import Input from '@/shared/ui/Input/Input'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'


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
        setFilter(prevState => ({...prevState, category: it}))
    }

    const handleOnClickCountry = (it: IOption) => {
        setFilter(prevState => ({...prevState, status: it}))
    }

    const handleOnClickMinOrder = (text: string) => {
        setFilter(prevState => ({...prevState, minOrder: text}))
    }
    
    return (
        <div ref={inputListRef} className={cls(cl.FilterCompaniesCatalog, isFiltersOpen ? cl.withMarginTop : '')}>
            <Input.TextAndSelect title={'Категории'}
                                 imageWidth={14} imageHeight={12}
                                 listOptions={categoryListOptions}
                                 defaultOption={filter.category}
                                 onClickOption={handleOnClickCategory} />
            <Input.TextAndSelect title={'Страна'}
                                 imageWidth={14} imageHeight={12}
                                 listOptions={countryListOptions}
                                 defaultOption={filter.country}
                                 onClickOption={handleOnClickCountry} />
            <Input.Text title={'Минимальный заказ от'}
                        name="minOrder"
                        type='number'
                        placeholder='Введите число'
                        defaultValue={filter.minOrder}
                        onChange={handleOnClickMinOrder} />
            {/* <FilterCountryOrCategoryInput
                title='Категории'
                defaultOption={categoryDefaultOption}
                listOptions={categoryListOptions}
                onClickOption={categoryOnClickOption}
            /> */}
            {/* <FilterCountryOrCategoryInput
                title='Страна'
                defaultOption={countryDefaultOption}
                listOptions={countryListOptions}
                onClickOption={countryOnClickOption}
            /> */}
            {/* <FilterMinOrderInput
                minOrderDefaultValue={minOrderDefaultValue}
                minOrderOnChange={minOrderOnChange}
            /> */}
        </div>
    )
}

