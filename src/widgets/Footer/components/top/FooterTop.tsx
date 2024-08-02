import { cls } from '@/shared/lib/classes.lib'
import { BUYERS_LINK_ITEMS_ARRAY, DOCUMENTS_LINK_ITEMS_ARRAY, SELLERS_LINK_ITEM_ARRAY } from '../../data/footer.data'
import { FooterTopColumn } from '../topColumn/FooterTopColumn'
import cl from './_FooterTop.module.scss'

interface IFooterTop {
  className?: string
}

export const FooterTop = ({
  className
}: IFooterTop) => {
  return (
    <div className={cls(cl.FooterTop, className)}>
      <FooterTopColumn title='Покупателям' columnLinkData={BUYERS_LINK_ITEMS_ARRAY} />
      <FooterTopColumn title='Продавцам' columnLinkData={SELLERS_LINK_ITEM_ARRAY} />
      <FooterTopColumn title='Документы' columnLinkData={DOCUMENTS_LINK_ITEMS_ARRAY} className={cl.noBorderRight} />
    </div>
  )
}
