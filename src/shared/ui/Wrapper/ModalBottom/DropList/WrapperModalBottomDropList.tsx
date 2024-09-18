import { FC } from "react"

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
            bottomChildren={
                <ListOption items={options} onClickItem={onClickOption}/>
            } 
            {...rest} />
    )
}
