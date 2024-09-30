import { ISliderTTop } from "@/shared/model/sliderT.model"
import { SliderT } from "@/shared/ui/SliderT/SliderT"
import { ITender } from "@/entities/Tender/model/tender.model"
import { CardsTenderSliderItem } from "./item/CardsTenderSliderItem"
import { IListTopLevel } from "@/shared/model/list.model"

interface ICardsTenderSlider extends ISliderTTop<ITender>{
    className?: string,
    classNameLine?: string,
    classNameBlockSupplier?: string
}

export const CardsTenderSlider = ({classNameLine, classNameBlockSupplier, ...rest}: ICardsTenderSlider) => {
    const generateKey: ISliderTTop<ITender>['generateKey'] = (it, index) => {
        return `${it.id}-${it.type}`
    }

    return (
        <SliderT component={CardsTenderSliderItem} 
                componentProps={{classNameLine: classNameLine, classNameBlockSupplier: classNameBlockSupplier}}  
                generateKey={generateKey}
                {...rest}/>
    )
}
