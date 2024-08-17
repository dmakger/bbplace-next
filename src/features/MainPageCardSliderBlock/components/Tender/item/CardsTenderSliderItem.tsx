import { TenderItem } from "@/entities/Tender"
import { ITender } from "@/entities/Tender/model/tender.model"
import { IListItem } from "@/shared/model/list.model"

interface ICardsTenderSliderItem extends IListItem<ITender>{
    classNameLine?: string,
    classNameBlockSupplier?: string
}

export const CardsTenderSliderItem = ({
    item: tender,
    className,
    classNameLine,
    classNameBlockSupplier    
}: ICardsTenderSliderItem) => {
    return (
       <TenderItem tender={tender} className={className} classNameLine={classNameLine} classNameBlockSupplier={classNameBlockSupplier}/>
    )
}
