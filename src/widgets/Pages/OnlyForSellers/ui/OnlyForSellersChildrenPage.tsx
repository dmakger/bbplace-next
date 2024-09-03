import cl from './_OnlyForSellersChildrenPage.module.scss'
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280"
import { WrapperForLogInNSupportPages } from "@/shared/ui/Wrapper/ForLogInNSupportPages"
import Image from "next/image"


export const OnlyForSellersChildrenPage = () => {
    return (
        <Wrapper1280>
           <WrapperForLogInNSupportPages hasForm={false}
            additionalBlockTitle='Страница только для продавцов'
            className={cl.notFoundPage}
            childrenImage={<Image src={''}
                alt=''
                className={cl.errorImage}
            />}
        />
        </Wrapper1280>
    )
}
