import { ChangeEvent, FC } from "react"

import { IWrapperModalBottom, WrapperModalBottom } from "../ui/WrapperModalBottom";
import { IOption } from "@/shared/model/option.model";

import cl from './_WrapperModalBottomDropSearch.module.scss'
import Input from "@/shared/ui/Input/Input";
import { SEARCH__ICON } from "@/shared/ui/Icon/data/search.data.icon";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { IListOptionProps, ListOption } from "@/shared/ui/List/Option/ui/List/ListOption";

interface WrapperModalBottomDropSearchProps extends IWrapperModalBottom {
    searchQuery: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    
    options: IOption[]
    onClickOption?: IListOptionProps['onClickItem']
}

export const WrapperModalBottomDropSearch:FC<WrapperModalBottomDropSearchProps> = ({title, searchQuery, handleInputChange, options, onClickOption, ...rest}) => {
    return (
        <WrapperModalBottom 
            topChildren={
                <div className={cl.searchWrapper}>
                    <Input.Text inputTypeVariant={EInputTextTypeVariants.TEXT} 
                                variant={EInputVariants.RECTANGULAR}
                                beforeImage={SEARCH__ICON} beforeProps={{width: 16, height: 16}}
                                placeholder={title}
                                value={searchQuery}
                                onChangeEvent={handleInputChange}
                                autoFocus={true} />
                </div>
            }
            bottomChildren={
                <ListOption items={options} onClickItem={onClickOption} />
            } 
            {...rest} />
    )
}
