import { BUYERS_LINK_ITEMS_ARRAY, DOCUMENTS_LINK_ITEMS_ARRAY, SELLERS_LINK_ITEM_ARRAY } from '../../data/footer.data'
import { FooterTopColumn } from '../topColumn/FooterTopColumn'
import cl from './_FooterTop.module.scss'


export const FooterTop = () => {
  return (
    <div className={cl.FooterTop}>
       <FooterTopColumn title='Покупателям' columnLinkData={BUYERS_LINK_ITEMS_ARRAY}/> 
       <FooterTopColumn title='Продавцам' columnLinkData={SELLERS_LINK_ITEM_ARRAY}/> 
       <FooterTopColumn title='Документы' columnLinkData={DOCUMENTS_LINK_ITEMS_ARRAY}/> 

    </div>
  )
}
