import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_TenderLKList.module.scss'
import { IListTopLevel } from "@/shared/model/list.model";
import { ETenderTypeEn, ITender } from "@/entities/Tender/model/tender.model";
import { List } from "@/shared/ui/List/Default/List";
import { TenderLKItem } from "../Item/TenderLKItem";
import { ListDirection } from "@/shared/data/list.data";
import { WrapperDefaultTenderNotFound } from "@/shared/ui/Wrapper/Default/ui/Tender/NotFound/WrapperDefaultTenderNotFound";

interface TenderLKListProps extends IListTopLevel<ITender> {
    onClickDelete?: (tender: ITender, type?: ETenderTypeEn) => void
}

export const TenderLKList: FC<TenderLKListProps> = ({
    items,
    onClickDelete,
    className,
    ...rest
}) => {
    return (
        <WrapperDefaultTenderNotFound showDefault={items.length === 0}>
            <List items={items} direction={ListDirection.Wrap}
                component={TenderLKItem} componentProps={{onClickDelete}} 
                className={cls(cl.list, className)}
                {...rest} />
        </WrapperDefaultTenderNotFound>
    )
}
