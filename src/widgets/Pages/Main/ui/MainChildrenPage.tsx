import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import cl from './_MainChildrenPage.module.scss'
import { ArticleForSuppliersOrBuyers } from '../components/ArticleForSuppliersOrBuyers/ArticleForSuppliersOrBuyers'
import { EArticleForSuppliersOrBuyersVariants } from '../model/mainChildrenPage.model'
import { AboutBB } from '../components/AboutBB/AboutBB'
import { PrimeList } from '../components/PrimeList/PrimeList'

export const MainChildrenPage = () => {
    return (
        <div className={cl.MainChildrenPage}>
            <Wrapper1280 classNameContent={cl.content}>
                <div className={cl.topContainer}>
                    <PrimeList/>
                </div>
                <div className={cl.articles}>
                    <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.BUYERS} />
                    <ArticleForSuppliersOrBuyers variant={EArticleForSuppliersOrBuyersVariants.SUPPLIERS} />
                </div>
                <AboutBB/>
            </Wrapper1280>
        </div>
    )
}
