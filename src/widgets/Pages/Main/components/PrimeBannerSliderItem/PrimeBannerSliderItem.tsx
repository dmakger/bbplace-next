import cl from './_PrimeSliderItem.module.scss'
import { IListItem } from "@/shared/model/list.model"
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from "next/image"

interface IPrimeBannerSliderItem extends IListItem<StaticImport>{}

export const PrimeBannerSliderItem = ({
    item
}: IPrimeBannerSliderItem) => {
    return (
       <Image src={item} alt="image" className={cl.image}/>
    )
}
