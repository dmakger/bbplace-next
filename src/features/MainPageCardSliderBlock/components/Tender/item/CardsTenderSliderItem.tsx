import { TenderItem } from "@/entities/Tender"
import { ITender } from "@/entities/Tender/model/tender.model"
import { IListItem } from "@/shared/model/list.model"

interface ICardsTenderSliderItem extends IListItem<ITender>{
}

export const CardsTenderSliderItem = ({
    item: tender,
    className,
    ...rest
    
}: ICardsTenderSliderItem) => {
    return (
       <TenderItem tender={tender} className={className}/>
    )
}
