import { cls } from '@/shared/lib/classes.lib'
import { ETCellItemVariants, ITCellItem } from '../../model/tariffs.model'
import cl from './_TCellItem.module.scss'


export const TCellItem = ({
    className,
    classNameData,
    variant = ETCellItemVariants.DEFAULT,
    title,
    subtitle
}: ITCellItem) => {  
  return (
    <td className={cls(cl.TCellItem, cl[variant], classNameData ?  cl[classNameData] : '', className)}>
        <h6 className={cl.title}>{title}</h6>
        <span className={cl.subtitle}>{subtitle}</span>
    </td>
  )
}
