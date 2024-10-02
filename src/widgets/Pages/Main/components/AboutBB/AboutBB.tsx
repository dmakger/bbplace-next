'use client'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_AboutBB.module.scss'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'
import { useRouter } from 'next/navigation'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'
import { useAppSelector } from '@/storage/hooks'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { BBP_PRESENTATION_DOCUMENT } from '@/shared/data/documents.data'
import { cls } from '@/shared/lib/classes.lib'
import BBPlaceGrayLeftAndRightBackgroundICON555 from '@/shared/assets/img/Background/BBPlace/BBPlaceGrayLeftAndRight555.svg'
import Image from 'next/image'


export const AboutBB = () => {

    //STATE
    const [is768, setIs768] = useState<boolean>(false)

    //ROUTER
    const router = useRouter()

    //RTK
    const { isAuth } = useAppSelector(state => state.user)

    //FUNCTIONS
    const goToRegistration = () => router.push(MAIN_PAGES.REGISTRATION.path);
    
    //VARIABLE
    const aboutBBTextArray: string[] = [
        'BBPlace — оптовая онлайн-платформа, разработанная для облегчения и улучшения бизнес-процессов в СНГ. ',
        'Мы предоставляем уникальную возможность бизнесам находить партнёров, клиентов и поставщиков, а также размещать свои товары и услуги для продвижения на глобальном рынке.',
        'Наши пользователи — это представители оптового сектора, работающие как поставщиками, так и покупателями.',
        'Перевод традиционных оптовых сделок компаний в эффективную интернет-коммерцию — основная цель нашей B2B платформы.',
        'Присоединяйтесь к BBPlace и откройте для себя новые горизонты оптовой торговли!'
    ]
    return (
        <>
            <section className={cl.AboutBB}>  
            <Image src={BBPlaceGrayLeftAndRightBackgroundICON555} alt={"qwe"} className={cl.backgroundImage} />
                <div className={cl.mainContainer}>
                    <h3 className={cl.title}>Немного о BBPlace</h3>
                    <div className={cl.aboutBBColumnContainer}>
                        {aboutBBTextArray.map(it => (
                            <p className={cl.aboutBBText} key={it}>{it}</p>
                        ))}
                        <div className={cls(cl.buttonsContainer, isAuth ? cl.noFlex : '')}>
                            <Button
                                className={cl.fill}
                                variant={ButtonVariant.BORDER}
                                color={ButtonColor.Secondary}
                                size={!is768 ? ButtonSize.Big : ButtonSize.Medium}
                                title='Подробнее'
                                href={MAIN_PAGES.CURRENT_DOCUMENT(BBP_PRESENTATION_DOCUMENT).path}
                                linkTarget='_blank'
                            />
                            {!isAuth && <Button
                                className={cl.fill}
                                variant={ButtonVariant.FILL}
                                size={!is768 ? ButtonSize.Big : ButtonSize.Medium}
                                title='Стать частью BBPlace'
                                onClick={goToRegistration}
                            />}
                        </div>
                    </div>
                </div>
            </section>
            <HandleSize width={768} set={setIs768} />
        </>
    )
}