import Image from 'next/image'
import cl from './_HorizontalCard.module.scss'
import productImage from '@/shared/assets/img/productImage.jpg'
import { Button } from '@/shared/ui/Button'
import { ButtonVariant } from '@/shared/ui/Button/model/model'
import Heart from '@/shared/assets/img/Heart.svg'
import { FavouriteIcon } from '@/shared/ui/FavouriteIcon/FavouriteIcon'

const HorizontalCard = () => {

    const additionalInfoOptions: string[] = [
        'Страна изготовитель:',
        'Статус:',
        'Склад:',
        'Описание:'
    ]

    return (
        <section className={cl.HorizontalCard}>
            <div className={cl.mainContainer}>
                <div className={cl.leftContainer}>
                    <Image src={productImage} alt='' />
                </div>
                <div className={cl.rightContainer}>
                    <div className={cl.mainInfo}>
                        <div className={cl.topContainer}>
                            <p className={cl.cardTitle}>
                                2023 зима новинка 350 GSM Мужские2023 зима новинка 350 ad2023
                            </p>
                            <div className={cl.favourite}>
                                <FavouriteIcon />
                            </div>
                        </div>

                        <p className={cl.cardPrice}>
                            305,80 RUB <span> /шт.</span>
                        </p>
                        <p className={cl.cardQuantity}>
                            Мин. Кол-во: <span>10 кг</span>
                        </p>
                        <p className={cl.cardSupplier}>
                            ООО "Древние Русы"
                        </p>
                    </div>
                    <div className={cl.additionalInfo}>
                        <div className={cl.options}>
                            {additionalInfoOptions.map(el => (
                                <p key={el}>{el}</p>
                            ))}
                        </div>
                        <div className={cl.info}>
                            <p>
                                Россия
                            </p>
                            <p>
                                Статус (товара)
                            </p>
                            <p>
                                есть на складе
                            </p>
                            <p>
                                Описание (несколько слов чтобы лазило) потом
                            </p>

                        </div>
                    </div>
                    <div className={cl.buttonContainer}>
                        <Button variant={ButtonVariant.BORDERED_RED_WIDE}>
                            Связаться с поставщиком
                        </Button>
                    </div>
                    <div className={cl.buttonContainerMobile}>
                        <Button variant={ButtonVariant.BORDERED_RED_NARROW}>
                            Написать
                        </Button>
                        <FavouriteIcon isEmptyHeart={false} />
                    </div>
                </div>
            </div>



        </section>
    )
}

export default HorizontalCard


