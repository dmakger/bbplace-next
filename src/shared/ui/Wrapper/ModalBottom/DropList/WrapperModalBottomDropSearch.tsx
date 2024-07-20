import { FC } from "react"

import { IWrapperModalBottom, WrapperModalBottom } from "../ui/WrapperModalBottom";
import { IOption } from "@/shared/model/option.model";
import { IListProps, List } from "@/shared/ui/List/ui/List";

interface WrapperModalBottomDropListProps extends IWrapperModalBottom {
    options: IOption[]
    onClickOption?: IListProps['onClickOption']
}

export const WrapperModalBottomDropList:FC<WrapperModalBottomDropListProps> = ({options, onClickOption, ...rest}) => {
    return (
        <WrapperModalBottom 
            bottomChildren={
                <List options={options} onClickOption={onClickOption} />
            } 
            {...rest} />
    )
}
