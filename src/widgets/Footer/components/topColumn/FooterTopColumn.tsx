import { cls } from '@/shared/lib/classes.lib'
import cl from './_FooterTopColumn.module.scss'
import { MenuButton } from '@/shared/ui/Button/data/Menu/MenuButton'
import { IMenuItem } from '@/shared/model/menu.model'
import { EMenuButtonVariant } from '@/shared/ui/Button/model/button.model'

interface IFooterTopColumn{
    className?: string,
    title: string,
    columnLinkData: IMenuItem[]
}

export const FooterTopColumn = ({
    className,
    title,
    columnLinkData
}: IFooterTopColumn) => {
  return (
    <div className={cls(cl.FooterTopColumn, className)}>
        <h5 className={cl.title}>{title}</h5>
        <nav className={cl.linksContainer}>
            {columnLinkData.map(it => (
                <MenuButton title={it.title} variant={EMenuButtonVariant.LINK} link={it.link} className={cl.menuLink}/>
            ))}
        </nav>
    </div>
  )
}
