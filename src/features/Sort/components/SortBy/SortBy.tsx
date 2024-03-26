import Input from '@/shared/ui/Input/Input'
import cl from './_SortBy.module.scss'
import { IOption } from '@/shared/model/option.model'

interface ISortBy {
    title: string,
    options: IOption[],
    defaultOption: IOption,
    classNameTitle?: string,
    onClickOption: Function,
    arrowWidth?: number,
    arrowHeight?: number
}

export const SortBy = ({
    title,
    options,
    defaultOption,
    classNameTitle,
    onClickOption,
    arrowWidth,
    arrowHeight
}: ISortBy) => {
    return (
        <div className={cl.inputsContainer}>
            <h4>{title}</h4>
            <Input.Select
                name='selectSort'
                options={options}
                defaultOption={defaultOption}
                classNameTitle={classNameTitle}
                width={arrowWidth}
                height={arrowHeight}
                onClickOption={onClickOption}
            />
        </div>
    )
}
