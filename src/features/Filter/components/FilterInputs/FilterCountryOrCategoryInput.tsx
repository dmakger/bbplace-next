import cl from './_FilterInputs.module.scss'
import Input from "@/shared/ui/Input/Input"
import { IOption } from "@/shared/model/option.model"

interface IFilterCountryOrCategoryInput{
    title: string,
    name?: string,
    listOptions: IOption[],
    defaultOption: IOption,
    onClickOption: Function
}

export const FilterCountryOrCategoryInput = ({
    title,
    name,
    listOptions,
    defaultOption,
    onClickOption
}: IFilterCountryOrCategoryInput) => {
    return (
        <div className={cl.inputsContainer}>
                <h4>{title}</h4>
                <Input.TextAndSelect
                    listOptions={listOptions}
                    defaultOption={defaultOption}
                    classNameOptions={cl.filterOptions}
                    imageWidth={14}
                    imageHeight={12}
                    name={name}
                    onClickOption={onClickOption}
                />
            </div>
    )
}
