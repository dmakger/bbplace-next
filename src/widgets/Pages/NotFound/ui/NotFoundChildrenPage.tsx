import { WrapperForLogInNSupportPages } from '@/shared/ui/Wrapper/ForLogInNSupportPages'
import cl from './_NotFoundChildrenPage.module.scss'
import Image from 'next/image'
import ErrorImage from '@/shared/assets/img/404/404.svg'

export const NotFoundChildrenPage = () => {
    return (
        <WrapperForLogInNSupportPages hasForm={false}
            additionalBlockTitle='Такой страницы не существует'
            className={cl.notFoundPage}
            childrenImage={<Image src={ErrorImage}
                alt=''
                className={cl.errorImage}
            />}
        />
    )
}
