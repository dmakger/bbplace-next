import { EArticleForSuppliersOrBuyersVariants, IArticleForSuppliersOrBuyersText } from '../../model/mainChildrenPage.model'
import cl from './_ArticleForSuppliersOrBuyers.module.scss'


interface IArticleForSuppliersOrBuyers {
    variant: EArticleForSuppliersOrBuyersVariants
}

export const ArticleForSuppliersOrBuyers = ({
    variant
}: IArticleForSuppliersOrBuyers) => {

    const BUYERS_ARTICLE_TEXT: IArticleForSuppliersOrBuyersText[] = [
        { subtitle: '1. Регистрация', text: 'Зарегистрируйтесь на платформе, заполнив форму с вашими контактными данными.' },
        { subtitle: '2. Поиск', text: 'Используйте удобные фильтры и категории для поиска нужных товаров или услуг.' },
        { subtitle: '3. Связь', text: 'Свяжитесь с продавцами через встроенную систему сообщений для уточнения деталей и условий сделки.' },
        { subtitle: '4. Заявка', text: 'Если не нашли нужный товар, оставьте заявку, и продавцы сами свяжутся с вами с предложениями.' },
    ]

    const SUPPLIERS_ARTICLE_TEXT: IArticleForSuppliersOrBuyersText[] = [
        { subtitle: '1. Создание страницы', text: 'Зарегистрируйтесь и создайте страницу вашей компании, добавив информацию о себе и своих услугах.' },
        { subtitle: '2. Создание товаров', text: 'Добавляйте свои товары, указывая подробное описание, цены и изображения.' },
        { subtitle: '3. Поиск по заявкам', text: 'Просматривайте оставленные заявки от покупателей и предлагайте свои товары или услуги в ответ на них.' },
        { subtitle: '4. Актуализация информации', text: 'Регулярно обновляйте информацию о своих товарах и услугах, чтобы обеспечить актуальность предложений для потенциальных клиентов.' },
    ]


    return (
        <article className={cl.ArticleForSuppliersOrBuyers}>
            <div className={cl.titleContainer}>
                <h4 className={cl.title}>{variant === EArticleForSuppliersOrBuyersVariants.BUYERS ? 'Покупателям' : 'Продавцам'}</h4>
            </div>
            <ol>
                {(variant === EArticleForSuppliersOrBuyersVariants.BUYERS ? BUYERS_ARTICLE_TEXT : SUPPLIERS_ARTICLE_TEXT).map(it => (
                    <li key={it.subtitle}>
                        <div className={cl.subtitleContainer}>
                            <h6 className={cl.subtitle}>{it.subtitle}</h6>
                        </div>
                        <p className={cl.text}>{it.text}</p>
                    </li>
                )
                )}
            </ol>
        </article>
    )
}
