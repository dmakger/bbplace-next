import cl from './_Sort.module.scss'
import Input from "@/shared/ui/Input/Input"
import { sortOptions } from "../data/sort.data"
import { IOption } from '@/shared/model/option.model'

interface ISort{
    sortByDate: IOption, 
    setSortByDate: Function
}


export const Sort = ({
    sortByDate,
    setSortByDate
}: ISort) => {

    return (
        <div className={cl.Sort}>
            <h3>
                Сортировка
            </h3>
            <Input.Select
                name='selectSort'
                options={sortOptions}
                defaultOption={sortByDate}
                classNameTitle={cl.sortSelect}
                width={14}
                height={12}
                onClickOption={setSortByDate}
            />
        </div>
    )
}
