import cl from './_TTCellItem.module.scss'
import { cls } from '@/shared/lib/classes.lib'
import { ETTVariants, ITTCellItem } from '../../model/tariffs.model'
import Image from 'next/image'


export const TTCellItem = ({
  className,
  classNameData,
  variant = ETTVariants.DEFAULT,
  title,
  iconSrc,
  subtitle,
}: ITTCellItem) => {
  return (
    <td className={cls(cl.TTCellItem, cl[variant], classNameData ? cl[classNameData] : '', className)}>
      {title && <h6 className={cl.title}>{title}</h6>}
      {iconSrc && <Image src={iconSrc} alt='' width={14} height={14} />}
      <span className={cl.subtitle}>{subtitle}</span>
    </td>
  )
}
