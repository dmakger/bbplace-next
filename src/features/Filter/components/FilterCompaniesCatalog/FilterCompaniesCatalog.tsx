import { Dispatch, RefObject, SetStateAction } from 'react'
import cl from './_FilterCompaniesCatalog.module.scss'
import { IOption } from '@/shared/model/option.model'
import { cls } from '@/shared/lib/classes.lib'
import Input from '@/shared/ui/Input/Input'
import { ISortFilter } from '@/widgets/SortFilterSidebar/model/sortFilterSidebar.model'
import { CORE_PARAMS } from '@/config/params/core.params.config'
import { EInputTextVariant } from '@/shared/ui/Input/Text/model/text.input.model'
import { EInputTextType } from '@/shared/ui/Input/ui/Text/data/text.input.data'
// import { EInputTextVariant } from '@/shared/ui/Input/ui/Text/data/text.input.data'


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
                                 arrowSizes={{width: 11, height: 15}}
                                 options={categoryListOptions}
                                 defaultOption={filter[CORE_PARAMS.CATEGORY] as IOption}
                                 onClickOption={handleOnClickCategory} />
            <Input.TextAndSelect title={'Страна'}
                                 arrowSizes={{width: 11, height: 15}}
                                 options={countryListOptions}
                                 defaultOption={filter[CORE_PARAMS.COUNTRY] as IOption}
                                 onClickOption={handleOnClickCountry} />
            <Input.Text title={'Минимальный заказ от'}
                        name="minOrder"
                        type={EInputTextType.Number}
                        placeholder='Введите число'
                        variantInputText={EInputTextVariant.W_HOVERED}
                        value={filter[CORE_PARAMS.MIN_ORDER_QUANTITY] as string}
                        onChange={handleOnClickMinOrder} />
        </div>
    )
}

