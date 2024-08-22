import { cls } from '@/shared/lib/classes.lib'
import { ETCellVariants, ITCellItem } from '../../model/tariffs.model'
import cl from './_TCellItem.module.scss'
import Image from 'next/image'


export const TCellItem = ({
  className,
  classNameData,
  variant = ETCellVariants.DEFAULT,
  title,
  iconSrc,
  subtitle,
}: ITCellItem) => {
  return (
    <td className={cls(cl.TCellItem, cl[variant], classNameData ? cl[classNameData] : '', className)}>
      {title && <h6 className={cl.title}>{title}</h6>}
      {iconSrc && <Image src={iconSrc} alt='' width={14} height={14} />}
      <span className={cl.subtitle}>{subtitle}</span>
    </td>
  )
}
