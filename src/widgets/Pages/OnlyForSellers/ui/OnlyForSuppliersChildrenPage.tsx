import { ONLY_FOR_SUPPLIERS_ICON } from '@/shared/ui/Icon/data/supplier.data.icon'
import cl from './_OnlyForSuppliersChildrenPage.module.scss'
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import Image from "next/image"


export const OnlyForSuppliersChildrenPage = () => {
    return (

        <WrapperForLogInNSupportPages hasForm={false}
            additionalBlockTitle='Страница только для поставщиков'
            className={cl.onlyForSuppliers}
            childrenImage={
                <Image src={ONLY_FOR_SUPPLIERS_ICON.default}
                    alt=''
                    className={cl.image}
                />}
        />
    )
}
