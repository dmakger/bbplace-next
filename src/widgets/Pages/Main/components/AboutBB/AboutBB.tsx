'use client'

import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_AboutBB.module.scss'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/button.model'
import { useRouter } from 'next/navigation'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'

export const AboutBB = () => {

    //STATE
    const [is768, setIs768] = useState<boolean>(false)

    //ROUTER
    const router = useRouter()

    //FUNCTIONS



    //VARIABLE
    const aboutBBTextArray: string[] = [
        'BBPlace — оптовая онлайн-платформа, разработанная для облегчения и улучшения бизнес-процессов в СНГ. ',
        'Мы предоставляем уникальную возможность бизнесам находить партнёров, клиентов и поставщиков, а также размещать свои товары и услуги для продвижения на глобальном рынке.',
        'Наши пользователи — это представители оптового сектора, работающие как продавцами, так и покупателями.',
        'Перевод традиционных оптовых сделок российских компаний в эффективную интернет-коммерцию — основная цель нашей B2B платформы.',
        'Присоединяйтесь к BBPlace и откройте для себя новые горизонты оптовой торговли!'
    ]

    return (
        <>
            <section className={cl.AboutBB}>
                <div className={cl.mainContainer}>
                    <h3 className={cl.title}>Немного о BBPlace</h3>
                    <div className={cl.aboutBBColumnContainer}>
                        {aboutBBTextArray.map(it => (
                            <p className={cl.aboutBBText}>{it}</p>
                        ))}
                        <div className={cl.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.BORDER}
                                color={ButtonColor.Secondary}
                                size={!is768 ? ButtonSize.Big : ButtonSize.Medium}
                                title='Подробнее'
                            />

                            <Button
                                className={cl.redButton}
                                variant={ButtonVariant.FILL}
                                size={!is768 ? ButtonSize.Big : ButtonSize.Medium}
                                title='Стать частью BBPlace'
                            />
                        </div>
                    </div>
                </div>


            </section>
            <HandleSize width={768} set={setIs768}/>
        </>

    )
}
