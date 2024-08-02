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
  
  const footerColumns = [
    { title: 'Покупателям', data: BUYERS_LINK_ITEMS_ARRAY },
    { title: 'Продавцам', data: SELLERS_LINK_ITEM_ARRAY },
    { title: 'Документы', data: DOCUMENTS_LINK_ITEMS_ARRAY, className: cl.noBorderRight },
  ];

  return (
    <div className={cls(cl.FooterTop, className || '')}>
      {footerColumns.map(({ title, data, className }, index) => (
        <FooterTopColumn
          key={index}
          title={title}
          columnLinkData={data}
          className={className}
        />
      ))}
    </div>
  )
}
