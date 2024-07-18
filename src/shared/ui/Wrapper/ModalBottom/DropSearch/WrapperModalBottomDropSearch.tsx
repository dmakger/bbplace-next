import { ChangeEvent, FC } from "react"

import { IWrapperModalBottom, WrapperModalBottom } from "../ui/WrapperModalBottom";
import { IOption } from "@/shared/model/option.model";
import { IListProps, List } from "@/shared/ui/List/ui/List";

import cl from './_WrapperModalBottomDropSearch.module.scss'
import Input from "@/shared/ui/Input/Input";
import { SEARCH__ICON } from "@/shared/ui/Icon/data/search.data.icon";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";

interface WrapperModalBottomDropSearchProps extends IWrapperModalBottom {
    searchQuery: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    
    options: IOption[]
    onClickOption?: IListProps['onClickOption']
}

export const WrapperModalBottomDropSearch:FC<WrapperModalBottomDropSearchProps> = ({title, searchQuery, handleInputChange, options, onClickOption, ...rest}) => {
    return (
        <WrapperModalBottom 
            topChildren={
                // <>
                    // <div className={cl.inputContainer}>
                    //     <Image src={SEARCH__ICON} alt={"Поиск"} width={16} height={16} className={cl.imageSearch} />
                    //     <input type="text"
                    //             placeholder={title}
                    //             value={searchQuery}
                    //             onClick={e => e.stopPropagation()}
                    //             onChange={handleInputChange}
                    //             autoFocus 
                    //             className={cl.input}/>
                    // </div>
                    // <Input.Text placeholder={title} classNameInputText={cl.inputContainer} />
                    <div className={cl.searchWrapper}>
                        <Input.Text inputTypeVariant={EInputTextTypeVariants.TEXT} 
                                    variant={EInputVariants.RECTANGULAR}
                                    beforeImage={SEARCH__ICON} beforeProps={{width: 16, height: 16}}
                                    placeholder={title}
                                    defaultValue={searchQuery}
                                    onChangeEvent={handleInputChange}
                                    autoFocus={true} />
                    </div>
            }
            bottomChildren={
                <List options={options} onClickOption={onClickOption} />
            } 
            {...rest} />
    )
}
