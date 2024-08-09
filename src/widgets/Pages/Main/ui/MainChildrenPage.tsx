import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import cl from './_MainChildrenPage.module.scss'
import { ArticleForSuppliersOrBuyers } from '../components/ArticleForSuppliersOrBuyers/ArticleForSuppliersOrBuyers'
import { EArticleForSuppliersOrBuyersVariants, IMainPageCardSliderBlockItem } from '../model/mainChildrenPage.model'
import { AboutBB } from '../components/AboutBB/AboutBB'
import { PrimeList } from '../components/PrimeList/PrimeList'
import { MainPageCardSliderBlock } from '@/features/MainPageCardSliderBlock'
import { MAIN_PAGES } from '@/config/pages-url.config'

export const MainChildrenPage = () => {

    const mainPageCardSliderBlockArray: IMainPageCardSliderBlockItem[] = [
        { title: 'Новые товары', buttonTitle: 'Все товары', buttonHref: MAIN_PAGES.PRODUCTS.path },
        { title: 'Новые тендеры', buttonTitle: 'Все тендеры', buttonHref: MAIN_PAGES.TENDERS.path },
        { title: 'Надёжные поставщики', buttonTitle: 'Все поставщики', buttonHref: MAIN_PAGES.SUPPLIERS.path },
    ]

    return (
        <div className={cl.MainChildrenPage}>
            <Wrapper1280 classNameContent={cl.content}>
                <div className={cl.topContainer}>
                    <PrimeList />
                </div>
                <div className={cl.articles}>
                    <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.BUYERS} />
                    <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.SUPPLIERS} />
                </div>
                {mainPageCardSliderBlockArray.map(it => (
                    <MainPageCardSliderBlock
                        key={it.title}
                        title={it.title}
                        buttonTitle={it.buttonTitle}
                        buttonHref={it.buttonHref}
                    />
                ))}

                <AboutBB />
            </Wrapper1280>
        </div>
    )
}
