import { FC } from "react"
import cl from './_WrapperModalBottomDropList.module.scss'

import { IWrapperModalBottom, WrapperModalBottom } from "../ui/WrapperModalBottom";
import { IOption } from "@/shared/model/option.model";
import { IListOptionProps, ListOption } from "@/shared/ui/List/Option/ui/List/ListOption";

interface WrapperModalBottomDropListProps extends IWrapperModalBottom {
    options: IOption[]
    onClickOption?: IListOptionProps['onClickItem']
}

export const WrapperModalBottomDropList:FC<WrapperModalBottomDropListProps> = ({options, onClickOption, ...rest}) => {
    return (
        <WrapperModalBottom 
            className={cl.modalBellow}
            bottomChildren={
                <ListOption items={options} onClickOption={onClickOption} className={cl.listOption}/>
            } 
            {...rest} />
    )
}
