import cl from './_OnlyForSellersChildrenPage.module.scss'
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import Image from "next/image"
import OnlyForSuppliersIcon from '@/shared/ui/OnlyForSuppliers/OnlyForSuppliersIcon.svg'


export const OnlyForSellersChildrenPage = () => {
    return (

        <WrapperForLogInNSupportPages hasForm={false}
            additionalBlockTitle='Страница только для продавцов'
            className={cl.onlyForSellers}
            childrenImage={
                <Image src={OnlyForSuppliersIcon}
                    alt=''
                    className={cl.image}
                />}
        />
    )
}
