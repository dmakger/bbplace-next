import Input from '@/shared/ui/Input/Input'
import cl from './_FilterInputs.module.scss'
import { IOption } from '@/shared/model/option.model'

interface IFilterStatusOrApplicationInput{
    title: string,
    listOptions: IOption[],
    defaultOption: IOption,
    onClickOption: Function,
    name?: string
}

export const FilterStatusOrApplicationInput = ({
    title,
    listOptions,
    defaultOption,
    onClickOption,
    name
    
}:IFilterStatusOrApplicationInput) => {
    return (
        <div className={cl.inputsContainer}>
                <h4>{title}</h4>
                <Input.Select
                    name={name}
                    options={listOptions}
                    defaultOption={defaultOption}
                    classNameOptions={cl.filterOptions}
                    arrowSizes={{width: 14, height: 12}}
                    onClickOption={onClickOption}
                />
            </div>
    )
}
