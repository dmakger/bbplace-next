import { ChangeEvent, FC } from "react"
import Image from 'next/image'

import { IWrapperModalBottom, WrapperModalBottom } from "../ui/WrapperModalBottom";
import { IOption } from "@/shared/model/option.model";
import { IListProps, List } from "@/shared/ui/List/ui/List";
import SEARCH_ICON from '@/../public/searchGray.svg'

import cl from './_WrapperModalBottomDropSearch.module.scss'
import Input from "@/shared/ui/Input/Input";

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
                <div className={cl.inputContainer}>
                    <Image src={SEARCH_ICON} alt={"Поиск"} width={16} height={16} className={cl.imageSearch} />
                    <input type="text"
                            placeholder={title}
                            value={searchQuery}
                            onClick={e => e.stopPropagation()}
                            onChange={handleInputChange}
                            autoFocus 
                            className={cl.input}/>
                </div>
                // <Input.Text placeholder={title} classNameInputText={cl.inputContainer} />
            }
            bottomChildren={
                <List options={options} onClickOption={onClickOption} />
            } 
            {...rest} />
    )
}
