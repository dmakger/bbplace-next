import cl from './_PrimeSliderItem.module.scss'
import { IListItem } from "@/shared/model/list.model"
import { ISliderImage } from "@/shared/model/sliderT.model"
import Image from "next/image"

interface IPrimeBannerSliderItem extends IListItem<ISliderImage>{}

export const PrimeBannerSliderItem = ({
    item
}: IPrimeBannerSliderItem) => {
    return (
       <Image src={item.src} alt="image" className={cl.image}/>
    )
}
