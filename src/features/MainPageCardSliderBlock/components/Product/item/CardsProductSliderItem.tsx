import { IProduct } from "@/entities/Product/model/product.model"
import { ProductV } from "@/entities/Product/ui/Vertical"
import { IListItem } from "@/shared/model/list.model"

interface ICardsProductSliderItem extends IListItem<IProduct>{}

export const CardsProductSliderItem = ({
    item: product,
    className    
}: ICardsProductSliderItem) => {
    return (
       <ProductV item={product} className={className}/>
    )
}
